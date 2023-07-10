<?php 

Class TenantController 
{
    private PDO $conn;

    // Constructor - DB connection
    public function __construct(Database $database) 
    {
        $this->conn = $database->getConnection();
    }

    // CREATE A TENANT
    public function Create(array $data): string 
    {
        $sql = "INSERT INTO tenant (lname, fname, email, aptno)
                VALUES (:lname, :fname, :email, :aptno)";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(':lname', $data['lname'], PDO::PARAM_STR);
        $stmt->bindValue(':fname', $data['fname'], PDO::PARAM_STR);
        $stmt->bindValue(':email', $data['email'], PDO::PARAM_STR);
        $stmt->bindValue(':aptno', $data['aptno'], PDO::PARAM_STR);

        $stmt->execute();

        return $this->conn->lastInsertId();
    }

    // GET All TENANTS
    public function getAll(): array 
    {
        $sql = "SELECT * FROM tenant";

        $stmt = $this->conn->query($sql);
        $result = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $result[] = $row;
        }

        return $result;
    }

    // GET A TENANT
    public function get(string $id): array | false
    {
        $sql = "SELECT * FROM tenant WHERE id = :id";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(":id", $id, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result;
    }

    // UPDATE
    public function update(array $current, array $new): int
    {
        $sql = "UPDATE tenant
                SET lname = :lname, fname = :fname, email = :email, aptno = :aptno
                WHERE id = :id";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':lname', $new['lname'] ?? $current['lname'], PDO::PARAM_STR);
        $stmt->bindValue(':fname', $new['fname'] ?? $current['fname'], PDO::PARAM_STR);
        $stmt->bindValue(':email', $new['email'] ?? $current['email'], PDO::PARAM_STR);
        $stmt->bindValue(':aptno', $new['aptno'] ?? $current['aptno'], PDO::PARAM_STR);
        $stmt->bindValue(':id', $current['id'], PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->rowCount();
    }

    // DELETE
    public function delete(string $id): int
    {
        $sql = "DELETE FROM tenant WHERE id = :id";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->rowCount();
    }
}

?>