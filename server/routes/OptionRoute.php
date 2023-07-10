<?php 

class OptionRoute
{
    // Constructor - arg: controller
    public function __construct(private OptionController $controller)
    {}

    // Process Request
    public function processRequest(string $method): void
    {
        $this->requestMethod($method);
    }

    private function requestMethod(string $method): void
    {
        switch ($method) {
            case "GET":
                echo json_encode($this->controller->getAll());
                break;
            case "PUT":
                $data = (array) json_decode(file_get_contents('php://input'), true);

                $row = $this->controller->update($data);

                echo json_encode([
                    'message' => "Option updated",
                    'rows' => $row
                ]);
                break;
            case "OPTIONS":
                http_response_code(200);
                break;
            default:
                http_response_code(405);
                header('Allow: GET, PUT, OPTIONS');
        }
    }
}

?>