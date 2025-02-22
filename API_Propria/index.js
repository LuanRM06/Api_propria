function SearchDriver() {
    let driverName = document.getElementById("driverName").value.trim().toLowerCase();

    if (!driverName) {
        alert("Por favor insira o nome de um piloto!.");
        return;
    }

    let limit = 30;
    let offset = 0;
    let foundDriver = null;

    function fetchDrivers(offset) {
        let driverApiUrl = `https://ergast.com/api/f1/drivers.json?limit=${limit}&offset=${offset}`;

        fetch(driverApiUrl)
            .then(response => response.json())
            .then(data => {
                const drivers = data.MRData.DriverTable.Drivers;

                foundDriver = drivers.find(d => {
                    const fullName = `${d.givenName} ${d.familyName}`.toLowerCase();
                    return fullName.includes(driverName);
                });

                if (foundDriver) {
                    displayDriver(foundDriver);
                } else if (offset + limit < data.MRData.total) {
                    fetchDrivers(offset + limit);
                } else {
                    alert("Piloto não encontrado, cheque o nome e tente novamente.");
                }
            })
            .catch(error => {
                console.error("ERRO!!!:", error);
                alert("Um erro ocorreu.");
            });
    }

    fetchDrivers(offset);
}

function displayDriver(driver) {
    document.getElementById("driverFullName").innerText = `${driver.givenName} ${driver.familyName}`;
    document.getElementById("driverDOB").innerText = `Data de Nascimento: ${driver.dateOfBirth}`;
    document.getElementById("driverNationality").innerText = `Nacionalidade: ${driver.nationality}`;
    document.getElementById("driverNumber").innerText = driver.permanentNumber || "N/A";

    document.getElementById("driverCard").style.display = "block";
}
