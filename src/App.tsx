import React, { ChangeEvent, FormEvent, useState } from "react"
import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import { useQuery } from "@tanstack/react-query"
import {
  fetchCourses,
  updateCourses,
  deleteCourses,
} from "@/services/api/courses"
import "./App.css"

function App() {
  const [formData, setFormData] = useState<CourseProps>({
    courseId: "",
    createdAt: "",
    description: "",
    id: 0,
    name: "",
    position: 0,
    rating: 0,
    status: 0,
    userId: "",
    userName: "",
  })
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["courses"],
    queryFn: () => fetchCourses(),
  })
  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const postForm = (action: string, data: CourseProps) => {
    if (action === "update") {
      updateCourses(data, refetch)
    }
    if (action === "delete") {
      deleteCourses(data, refetch)
    }
  }

  return (
    <Box>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="center">courseId</TableCell>
                <TableCell align="center">name</TableCell>
                <TableCell align="center">description</TableCell>
                <TableCell align="center">userId</TableCell>
                <TableCell align="center">userName</TableCell>
                <TableCell align="center">position</TableCell>
                <TableCell align="center">rating</TableCell>
                <TableCell align="center">status</TableCell>
                <TableCell align="center">createdAt</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data?.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>
                      <form name={`${item.id}`} onSubmit={handleSubmitForm}>
                        <input
                          type="text"
                          name="courseId"
                          value={item.courseId}
                          onChange={handleChange}
                        />
                      </form>
                    </TableCell>
                    <TableCell>
                      <form name={`${item.id}`} onSubmit={handleSubmitForm}>
                        <input
                          type="text"
                          name="name"
                          value={item.name}
                          onChange={handleChange}
                        />
                      </form>
                    </TableCell>
                    <TableCell>
                      <form name={`${item.id}`} onSubmit={handleSubmitForm}>
                        <input
                          type="text"
                          name="description"
                          value={item.description}
                          onChange={handleChange}
                        />
                      </form>
                    </TableCell>
                    <TableCell>
                      <form name={`${item.id}`} onSubmit={handleSubmitForm}>
                        <input
                          type="text"
                          name="userId"
                          value={item.userId}
                          onChange={handleChange}
                        />
                      </form>
                    </TableCell>
                    <TableCell>
                      <form name={`${item.id}`} onSubmit={handleSubmitForm}>
                        <input
                          type="text"
                          name="userName"
                          value={item.userName}
                          onChange={handleChange}
                        />
                      </form>
                    </TableCell>
                    <TableCell>
                      <form name={`${item.id}`} onSubmit={handleSubmitForm}>
                        <input
                          type="number"
                          name="position"
                          value={item.position}
                          onChange={handleChange}
                        />
                      </form>
                    </TableCell>
                    <TableCell>
                      <form name={`${item.id}`} onSubmit={handleSubmitForm}>
                        <input
                          type="text"
                          name="rating"
                          value={item.rating}
                          onChange={handleChange}
                        />
                      </form>
                    </TableCell>
                    <TableCell>
                      <form name={`${item.id}`} onSubmit={handleSubmitForm}>
                        <input
                          type="text"
                          name="status"
                          value={item.status}
                          onChange={handleChange}
                        />
                      </form>
                    </TableCell>
                    <TableCell>{item.createdAt}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#ccc",
                          color: "#000",
                          marginBottom: "20px",
                        }}
                        onClick={() => {
                          postForm("update", {
                            courseId: formData.courseId || item.courseId,
                            createdAt: formData.createdAt || item.createdAt,
                            description:
                              formData.description || item.description,
                            id: formData.id || item.id,
                            name: formData.name || item.name,
                            position: formData.position || item.position,
                            rating: formData.rating || item.rating,
                            status: formData.status || item.status,
                            userId: formData.userId || item.userId,
                            userName: formData.userName || item.courseId,
                          })
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "red", color: "#000" }}
                        onClick={() => {
                          postForm("delete", {
                            courseId: formData.courseId || item.courseId,
                            createdAt: formData.createdAt || item.createdAt,
                            description:
                              formData.description || item.description,
                            id: formData.id || item.id,
                            name: formData.name || item.name,
                            position: formData.position || item.position,
                            rating: formData.rating || item.rating,
                            status: formData.status || item.status,
                            userId: formData.userId || item.userId,
                            userName: formData.userName || item.courseId,
                          })
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}

export default App
