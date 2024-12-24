export const fetchApi = async (req, res) => {
  const name = req.body.name;

  if (!name) {
    throw new Error("Name is required");
  }

  try {
    const studentsUrl = `https://hp-api.herokuapp.com/api/characters/students`;
    const response = await fetch(studentsUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    if (data.length === 0) {
      return res.status(404).json({ message: "Actor not found" });
    }
    const studentnames = data.filter((student) =>
      student.name.toLowerCase().includes(name.toLowerCase())
    );
    if (studentnames.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    // const filters = ["name", "house", "patronus", "image", "alive", "gender"];
    // studentnames.forEach((student) => {
    //   Object.keys(student).forEach((key) => {
    //     if (!filters.includes(key)) {
    //       delete student[key];
    //     }
    //   });
    // });
    const filteredStudents = studentnames.map((student) => ({
      name: student.name,
      house: student.house,
      gender: student.gender,
    }));

    res.json(filteredStudents);
    // res.json(filters.length === 1 ? studentnames[0] : studentnames);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};
