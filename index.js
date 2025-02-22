const express = require('express');
const fs = require('fs');
const app = express();
const port = 8000;

app.get('/write-stamp', (req, res) => {
    const now = new Date();
    const timestamp = now.toISOString();
    const formattedDate = now.toISOString().replace(/:/g, '-').replace(/\..+/, '');
    const filePath = `${formattedDate}.txt`;

    fs.writeFile(filePath, timestamp, (err) => {
        if (err) {
            console.log('Error writing to file:', err);
            return res.status(500).send('Error writing to file')
        }
        console.log(`Timestamp written to file ${filePath} successfully.`);

        try {
            const data = fs.readFileSync(filePath);
            console.log(data.toString());
            console.log("Program Ended");
            res.send(`Timestamp written to file ${filePath} successfully. File content: ${data.toString()}`);
        } catch (error) {
            console.error('Error reading file:', error);
            res.status(500).send('Error reading file.');
        }
    })
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});