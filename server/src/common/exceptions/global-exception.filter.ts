import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        // Check if exception is an object with `message` and `statusCode` properties
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : exception?.statusCode || 500;

        const message =
            exception instanceof HttpException
                ? exception.getResponse()
                : exception?.message || "Internal server error";

        response.status(status).json({
            success: false,
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            data: {
                message: typeof message === "string" ? message : (message as any).message
            }

        });
    }
}

