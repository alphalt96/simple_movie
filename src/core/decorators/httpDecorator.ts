
import 'reflect-metadata';
import { Express, Router, Request, Response, NextFunction } from 'express';
import { ControllerInstance, Controller } from '../controller';
import { validateHandle } from '../../shared/validator/core';


// type HttpHolder contain http info
type HttpHolder = {
  method: string
  path: string
  handler: string,
  middlewares?: (any[] | any)[]
};

type Middleware = {
  middleware: (req: Request, res: Response, next: NextFunction) => void
  excepts?: string[]
  applyRoute?: string
};

/**
 * define prefix of router
 * @param path : router prefix
 */
export const BaseUrl = (routerObj: {
  prefix: string,
  middlewares?: Middleware[]
}) => {
  return (target: Function) => {
    const httpHolder = Reflect.getOwnMetadata('httpHolder', target.prototype);
    Reflect.defineMetadata('router', {
      baseUrl: routerObj.prefix,
      middlewares: routerObj.middlewares,
      httpHolder
    }, target.prototype);
  };
};

/**
 * factory function of each http decorator
 * @param method : method type
 * @param path : path
 * @param handler : handler name
 * @param target : target of decorator
 */
const decoratorFactory = (
  method: string,
  path: string,
  middlewares: (any[] | any)[],
  handler: string,
  target: any) => {
  let holders: HttpHolder[] = Reflect.getOwnMetadata('httpHolder', target);
  if (!holders) {
    Reflect.defineMetadata('httpHolder', holders = [], target);
  }
  holders.push({
    method,
    path,
    handler,
    middlewares
  });
};

/**
 * http method get
 * @param path : route path
 */
export const Get = (route: {
  path: string,
  middlewares?: (any[] | any)[]
}) => {
  return (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor) => {
    return decoratorFactory('get', route.path, route.middlewares, propertyKey, target);
  };
};

/**
 * http method post
 * @param path : route path
 */
export const Post = (route: {
  path: string,
  middlewares?: (any[] | any)[]
}) => {
  return (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    return decoratorFactory('post', route.path, route.middlewares, propertyKey, target);
  };
};

/**
 * auto load route for each controller imported
 * @param content : object contain express app and list controller
 */
export const loadHandlerWithRoute = (content: {
  app: Express,
  controllers: { new(...args: any): Controller }[] // or (new (...args: any) => Controller)[] is the same
}) => {
  const { app, controllers } = content;
  if (controllers.length > 0) {
    controllers.forEach((Controller: ControllerInstance) => {
      const controller = new Controller();
      const router = Router();

      const reflectRoutes = Reflect.getMetadata('router', controller);

      // import base router middlware
      const middlewares = (reflectRoutes.middlewares as Array<any>) || undefined;
      if (middlewares) {
        middlewares.forEach((middleware: Middleware, i) => {
          if (!middleware.excepts) {
            middlewares.splice(i, 1);
            router.use(middleware.applyRoute || '*', middleware.middleware);
          }
        });
      }

      reflectRoutes.httpHolder.forEach((route: HttpHolder) => {
        // get base route middlewares
        const baseMiddlewares = (middlewares || [])
          .filter((middleware: Middleware) => {
            return middleware.excepts.includes(route.handler);
          })
          .map((middleware: Middleware) => {
            return middleware.middleware;
          });
        // get private middlewares
        const privateMiddlewares = (route.middlewares || []).reduce((pre, cur) => {
          const tmp = pre;
          if (cur instanceof Function) tmp.push(cur);
          else tmp.push(...cur);
          return tmp;
        }, []);
        router[route.method].apply(router, [
          route.path,
          ...baseMiddlewares,
          ...privateMiddlewares,
          validateHandle,
          controller[route.handler].bind(controller)
        ]);
      });
      app.use(reflectRoutes.baseUrl, router);
    });
  }
};
