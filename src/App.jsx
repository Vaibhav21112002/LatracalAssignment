import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState({
        name: "",
        roll: "",
        checkIn: "",
        checkOut: "",
    });
    useEffect(() => {
        const students = localStorage.getItem("students");
        if (students) {
            setStudents(JSON.parse(students));
        }
    }, []);
    const handleSubmit = () => {
        if (
            student.name === "" ||
            student.roll === "" ||
            student.checkIn === ""
        ) {
            alert("Please fill all the fields");
            return;
        }
        //Check if the student is already present
        for (let i = 0; i < students.length; i++) {
            if (students[i].roll === student.roll) {
                alert("Student already present");
                return;
            }
        }

        setStudents([...students, student]);
        if (localStorage.getItem("students") === null) {
            localStorage.setItem("students", JSON.stringify([]));
        } else {
            localStorage.setItem(
                "students",
                JSON.stringify([...students, student])
            );
        }
        setStudent({
            name: "",
            roll: "",
            checkIn: "",
            checkOut: "",
        });
    };
    return (
        <div className="background">
            {/* Details of Students */}
            <div className="details">
                <h1 className="details">Details of Students</h1>
                <h1 className="info">Total Number of Students : {students.length}</h1>
                <h1 className="info">
                    Total Number of Students current in schools :{" "}
                    {
                        students.filter((student) => student.checkOut === "")
                            .length
                    }
                </h1>
            </div>

            {/* Form */}
            <div className="form">
                <label className="labelClass">Student Name :</label>
                <input
                    type="text"
                    className="inputClass"
                    value={student.name}
                    onChange={(e) =>
                        setStudent({ ...student, name: e.target.value })
                    }
                />
                <br />
                <label className="labelClass">Student Roll :</label>
                <input
                    type="text"
                    className="inputClass"
                    value={student.roll}
                    onChange={(e) =>
                        setStudent({ ...student, roll: e.target.value })
                    }
                />
                <br />
                <label className="labelClass">Student Check In Time :</label>
                <input
                    type="text"
                    className="inputClass"
                    value={student.checkIn}
                    onChange={(e) =>
                        setStudent({ ...student, checkIn: e.target.value })
                    }
                />
                <br />
                <button onClick={handleSubmit}>Add Details</button>
            </div>
            {/* List */}
            <div className="tableDiv">
                <table>
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Student Roll</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr>
                                <td>{student.name}</td>
                                <td>{student.roll}</td>
                                <td>{student.checkIn}</td>
                                <td>
                                    {student.checkOut === "" ? (
                                        <button
                                        className="checkoutBtn"
                                            onClick={() => {
                                                const t = prompt(
                                                    "Enter Check Out Time"
                                                );
                                                const newStudents =
                                                    students.map((s) => {
                                                        if (
                                                            s.roll ===
                                                            student.roll
                                                        ) {
                                                            return {
                                                                ...s,
                                                                checkOut: t,
                                                            };
                                                        }
                                                        return s;
                                                    });
                                                setStudents(newStudents);
                                                localStorage.setItem(
                                                    "students",
                                                    JSON.stringify(newStudents)
                                                );
                                            }}
                                        >
                                            Add Checkout Time
                                        </button>
                                    ) : (
                                        student.checkOut
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default App;
