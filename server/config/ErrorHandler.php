<?php

class ErrorHandler {
    public static function handleException(Throwable $exception): void 
    {
        http_response_code(500);

        echo  json_encode([
            "code" => $exception->getCode(),
            "message" => $exception->getMessage(),
            "file" => $exception->getFile(),
            "line" => $exception->getLine()
        ]);
    }

    public static function handleError(
        int $errcode, string $errmsg, string $errfile, int $errline): bool 
        {
            throw new ErrorException($errmsg, 0, $errcode, $errfile, $errline);
        }
}

?>