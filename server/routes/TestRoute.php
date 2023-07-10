<?php 

class TestRoute
{
    private PDO $conn;

    // Constructor - arg: controller
    public function __construct(Database $database) 
    {
        $this->conn = $database->getConnection();
    }

    public function processRequest(string $method, ?string $id): void
    {
        // $method = $_SERVER['REQUEST_METHOD'];
        switch($method) {
            case "GET":
                $sql = "SELECT * FROM tenant";
                if ($id) {
                // $path = explode('/', $_SERVER['REQUEST_URI']);
                // if(isset($path[3]) && is_numeric($path[3])) {
                    $sql .= " WHERE id = :id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':id', $id);
                    $stmt->execute();
                    $result = $stmt->fetch(PDO::FETCH_ASSOC);
                } else {
                    $stmt = $this->conn->prepare($sql);
                    $stmt->execute();
                    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                }

                echo json_encode($result);
                break;
            case "POST":
                $data = json_decode(file_get_contents('php://input'));
                $sql = "INSERT INTO tenant (lname, fname, email, aptno) 
                        VALUES (:lname, :fname, :email, :aptno)";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(':lname', $data->lname);
                $stmt->bindParam(':fname', $data->fname);
                $stmt->bindParam(':email', $data->email);
                $stmt->bindParam(':aptno', $data->aptno);

                if($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record created successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to create record.'];
                }
                echo json_encode($response);
                break;
            case "PUT":
                $data = json_decode(file_get_contents('php://input'));
                $sql = "UPDATE tenant 
                        SET lname = :lname, fname = :fname, email = :email, aptno = :aptno 
                        WHERE id = :id";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(':lname', $data->lname);
                $stmt->bindParam(':fname', $data->fname);
                $stmt->bindParam(':email', $data->email);
                $stmt->bindParam(':aptno', $data->aptno);
                $stmt->bindParam(':id', $id);

                if($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record updated successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to update record.'];
                }
                echo json_encode($response);
                break;
            case "DELETE":
                $sql = "DELETE FROM tenant WHERE id = :id";
                // $path = explode('/', $_SERVER['REQUEST_URI']);

                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(':id', $id);

                if($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to delete record.'];
                }
                echo json_encode($response);
                break;
            case "OPTIONS":
                http_response_code(200);
                break;
            default:
                http_response_code(405);
                header('Allow: POST, GET, PUT, DELETE');
        }
    }
}

?>