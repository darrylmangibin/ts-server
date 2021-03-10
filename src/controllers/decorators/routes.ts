import { RequestHandler } from 'express';
import 'reflect-metadata';
import { Methods } from './Methods';

interface RouterHandlerDescriptor extends PropertyDescriptor {
	value?: RequestHandler;
}

function routerBinder(method: string) {
	return function (path: string) {
		return function (target: any, key: string, desc: RouterHandlerDescriptor) {
			Reflect.defineMetadata('path', path, target, key);
			Reflect.defineMetadata('method', method, target, key);
		};
	};
}

export const get = routerBinder(Methods.get);
export const put = routerBinder(Methods.put);
export const post = routerBinder(Methods.post);
export const del = routerBinder(Methods.del);
export const patch = routerBinder(Methods.patch);
