// to make the file a module and avoid the TypeScript error
export type {};

declare global {
	namespace Express {
		export interface Request {
			user: { id: number; email: string; password?: string };
		}
	}
}