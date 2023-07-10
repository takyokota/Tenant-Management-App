<?php 

declare(strict_types=1);

require_once (__DIR__ . "/vendor/autoload.php");

// to access to .env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// autoload files
spl_autoload_register(function ($class) 
{
    $sources = array(
        "config/", "controllers/", "routes/");
        
    foreach ($sources as $source) {
        if (file_exists(__DIR__ . "/$source" . "$class.php")) {
            require_once __DIR__ . "/$source" . "$class.php";
        }
    }
});

// Error Handler
set_error_handler("ErrorHandler::handleError");
set_exception_handler("ErrorHandler::handleException");

// header config
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");

// obtaining URI
$parts = explode('/', $_SERVER['REQUEST_URI']);
if ($parts[1] !== 'tenants' && $parts[1] !== 'options') {
    http_response_code(404);
    exit;
}
$id = $parts[2] ?? null;

// connecting to PostgreSQL
$database = new Database($_ENV["HOST"], $_ENV["DB_NAME"], $_ENV["USER"], $_ENV["PASSWORD"]);

if ($parts[1] === 'tenants') {
    global $database, $id;
    // FOR Tenants
    // Controller
    $tenantController = new TenantController($database);
    
    // Route
    $tenantRoute = new TenantRoute($tenantController);
    $tenantRoute->processRequest($_SERVER['REQUEST_METHOD'], $id);
    
    // $tenantRoute = new TestRoute($database);
    // $tenantRoute->processRequest($_SERVER['REQUEST_METHOD'], $id);
} else if ($parts[1] === 'options') {
    global $database;
    // FOR Options
    // Controller
    $optionController = new OptionController($database);
    
    // Route
    $optionRoute = new OptionRoute($optionController);
    $optionRoute->processRequest($_SERVER['REQUEST_METHOD']);
}


?>