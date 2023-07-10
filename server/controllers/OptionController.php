<?php 

class OptionController
{
    private PDO $conn;

    // Constructor - DB connection
    public function __construct(Database $database)
    {
        $this->conn = $database->getConnection();
    }

    // GET OPTIONS
    public function getAll(): array
    {
        $sql = "SELECT soption FROM sort_option WHERE id = 1";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result;
    }

    // UPDATE
    public function update(array $new): int
    {
        $sql = "UPDATE sort_option
                SET soption = :soption
                WHERE id = 1";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':soption', $new['soption'], PDO::PARAM_STR);
        $stmt->execute();

        return $stmt->rowCount();
    }
}

?>