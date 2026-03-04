import { type Request, type Response } from 'express';
export declare const registerUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const loginUser: (req: Request, res: Response) => Promise<void>;
export declare const getUserProfile: (req: any, res: Response) => Promise<void>;
//# sourceMappingURL=authController.d.ts.map