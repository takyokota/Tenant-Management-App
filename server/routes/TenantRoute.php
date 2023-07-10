<?php 

class TenantRoute 
{
    // Constructor - arg: controller
    public function __construct(private TenantController $controller) 
    {}

    // Process Request Selector
    public function processRequest(string $method, ?string $id): void 
    {
        if ($id) {
            $this->requestMethodWithId($method, $id);
        } else {
            $this->requestMethod($method);
        }
    }

    // Requests with method and ID
    private function requestMethodWithId(string $method, string $id): void 
    {
        $tenant = $this->controller->get($id);

        if (!$tenant) {
            http_response_code(404);
            echo json_encode(['message' => 'Tenant not found']);
            return;
        }

        switch ($method) {
            case "GET":
                echo json_encode($tenant);
                break;
            case "PUT":
                $data = (array) json_decode(file_get_contents('php://input'), true);

                $errors = $this->getValidationErrors($data, false);
                if (!empty($errors)) {
                    http_response_code(422);
                    echo json_encode(['errors' => $errors]);
                    break;
                }

                $rows = $this->controller->update($tenant, $data);

                echo json_encode([
                    'message' => "Tenant $id updated",
                    'rows' => $rows
                ]);
                break;
            case "DELETE":
                $rows = $this->controller->delete($id);

                echo json_encode([
                    'message' => "Tenant $id deleted",
                    'rows' => $rows
                ]);
                break;
            case "OPTIONS":
                http_response_code(200);
                break;
            default:
                http_response_code(405);
                header('Allow: GET, PUT, DELETE, OPTIONS');
        }
    }

    // Requests with method
    private function requestMethod(string $method): void 
    {
        switch ($method) {
            case "POST":
                $data = (array) json_decode(file_get_contents('php://input'), true);

                $errors = $this->getValidationErrors($data);
                if (!empty($errors)) {
                    http_response_code(422);
                    echo json_encode(['errors' => $errors]);
                    break;
                }

                $id = $this->controller->create($data);

                http_response_code(201);
                echo json_encode([
                    'message' => "Tenant create",
                    'id' => $id
                ]);
                break;
            case "GET":
                echo json_encode($this->controller->getAll());
                break;
            case "OPTIONS":
                http_response_code(200);
                break;
            default:
                http_response_code(405);
                header('Allow: GET, POST, OPTIONS');
        }
    }

    // Validation Error
    private function getValidationErrors(array $data, bool $is_new = true): array
    {
        $errors = [];

        if ($is_new && empty($data['lname'])) {
            $errors[] = 'Last name is required';
        }

        if ($is_new && empty($data['fname'])) {
            $errors[] = 'First name is required';
        }

        if ($is_new && empty($data['email'])) {
            $errors[] = 'Email is required';
        }

        if ($is_new && empty($data['aptno'])) {
            $errors[] = 'Apartment number is required';
        }

        return $errors;
    }
}
?>