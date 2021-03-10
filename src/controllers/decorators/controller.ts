import 'reflect-metadata';
import { AppRouter } from '../../appRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';

export function controller(routePrefix: string) {
	return function (target: Function) {
		const router = AppRouter.getInstance();

		for (let key in target.prototype) {
			const routehandler = target.prototype[key];

			const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
			const method: Methods = Reflect.getMetadata(
				MetadataKeys.method,
				target.prototype,
				key
			);
			if (path) {
				router[method](`${routePrefix}${path}`, routehandler);
			}
		}
	};
}