const snippets = {
    "DB Connectie (db.php)": `<?php
$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'project';
$conn = mysqli_connect($host, $user, $pass, $db);
if (!$conn) {
die("Fout bij verbinden: " . mysqli_connect_error());
}
?>`,

    "Insert": `<?php
include 'db.php';
if ($_SERVER["REQUEST_METHOD"] == "POST") {
$naam = $_POST["naam"];
$email = $_POST["email"];
$sql = "INSERT INTO users (naam, email) VALUES ('$naam', '$email')";
mysqli_query($conn, $sql);
}
?>`,

    "Select (data ophalen)": `<?php
include 'db.php';
$result = mysqli_query($conn, "SELECT * FROM users");
while ($row = mysqli_fetch_assoc($result)) {
echo $row["naam"] . " - " . $row["email"] . "<br>";
}
?>`,

    "Delete": `<?php
include 'db.php';
$id = $_GET["id"];
mysqli_query($conn, "DELETE FROM users WHERE id = $id");
?>`,

    "Update": `<?php
include 'db.php';
$id = $_POST["id"];
$naam = $_POST["naam"];
mysqli_query($conn, "UPDATE users SET naam = '$naam' WHERE id = $id");
?>`,

    "Master-Detail": `<?php
include 'db.php';
$cat_id = $_GET["cat_id"];
$cat = mysqli_query($conn, "SELECT * FROM categories WHERE id = $cat_id");
$items = mysqli_query($conn, "SELECT * FROM products WHERE category_id = $cat_id");
?>`,

    "Login": `<?php
include 'db.php';
if ($_POST) {
$email = $_POST['email'];
$pass = $_POST['password'];
$result = mysqli_query($conn, "SELECT * FROM users WHERE email = '$email' AND password = '$pass'");
if (mysqli_num_rows($result) == 1) {
  echo "Logged in!";
} else {
  echo "Login mislukt";
}
}
?>`,

    "Registratie": `<?php
include 'db.php';
$email = $_POST['email'];
$pass = $_POST['password'];
$sql = "INSERT INTO users (email, password) VALUES ('$email', '$pass')";
mysqli_query($conn, $sql);
?>`,

    "GET gebruiken": `<?php
$naam = $_GET['naam'];
echo "Welkom, " . htmlspecialchars($naam);
?>`,

    "POST gebruiken": `<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
echo "Hallo " . htmlspecialchars($_POST['naam']);
}
?>`
  };

  const container = document.getElementById("card-row");
  Object.entries(snippets).forEach(([title, code], i) => {
    const key = title.replace(/\W/g, '_');
    container.innerHTML += `
      <div class="col" onclick="showCode('${key}')">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">Klik om de code te bekijken</p>
          </div>
        </div>
      </div>`;
  });

  function showCode(key) {
    const title = Object.keys(snippets).find(t => t.replace(/\W/g, '_') === key);
    document.getElementById("codeContent").textContent = snippets[title];
    new bootstrap.Modal(document.getElementById("codeModal")).show();
  }