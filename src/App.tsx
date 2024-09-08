import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import { useMutation, useQuery } from "@tanstack/react-query"
import moment from "moment"
import {
  fetchCourses,
  updateCourses,
  deleteCourses,
} from "@/services/api/courses"
import "./App.css"

function App() {
  const [coursesList, setCoursesList] = useState<CourseProps[] | undefined>(
    undefined,
  )

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["courses"],
    queryFn: () => fetchCourses(),
    staleTime: Infinity,
  })

  const updateCourse = useMutation({
    mutationFn: updateCourses,
  })

  const deleteCourse = useMutation({
    mutationFn: deleteCourses,
  })

  const handleChange = (id: number, ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target
    setCoursesList((prevState) => {
      const updateList = prevState?.map((item) =>
        item.id === id ? { ...item, [name]: value } : item,
      )

      return updateList
    })
  }

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const postForm = (action: string, id: number) => {
    const data = coursesList
      ?.filter((item) => item.id === id)
      .reduce((pre, cur) => ({ ...pre, ...cur }), {}) as CourseProps

    if (action === "update") {
      updateCourse.mutateAsync({ data, fn: refetch })
    }
    if (action === "delete") {
      deleteCourse.mutateAsync({ id: data.id, fn: refetch })
    }
  }

  const addBGColor = (text: number): string => {
    const colorMap: { [key: number]: string } = {
      1: "grey",
      2: "blue",
      3: "green",
      4: "pink",
      5: "yellow",
    }

    return colorMap[text] || "white"
  }

  useEffect(() => {
    if (!isLoading && data) {
      setCoursesList(data)
    }
  }, [data, isLoading])

  if (isLoading) {
    return (
      <Box>
        <div>Loading...</div>
      </Box>
    )
  }

  if (isError) {
    return (
      <Box>
        <div>There has been a problem loading your data!</div>
      </Box>
    )
  }

  return (
    <Box>
      {coursesList && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="center">CourseId</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">UserId</TableCell>
                <TableCell align="center">UserName</TableCell>
                <TableCell align="center">Position</TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Date Created</TableCell>
                <TableCell align="center">Date Updated</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {coursesList?.map((item) => {
                return (
                  <TableRow
                    key={item.id}
                    sx={{
                      backgroundColor: `${addBGColor(item.rating)}`,
                    }}
                  >
                    <TableCell>{item.id}</TableCell>
                    <TableCell>
                      <form
                        name={`form-${item.id}`}
                        onSubmit={handleSubmitForm}
                        data-testid={`form-${item.id}`}
                      >
                        <input
                          type="text"
                          name="courseId"
                          value={item.courseId}
                          onChange={(e) => handleChange(item.id, e)}
                          data-testid={`courseid-${item.id}`}
                        />
                      </form>
                    </TableCell>
                    <TableCell>
                      <form
                        name={`form-${item.id}`}
                        onSubmit={handleSubmitForm}
                        data-testid={`form-${item.id}`}
                      >
                        <input
                          type="text"
                          name="name"
                          value={item.name}
                          onChange={(e) => handleChange(item.id, e)}
                          data-testid={`name-${item.id}`}
                        />
                      </form>
                    </TableCell>
                    <TableCell>
                      <form
                        name={`form-${item.id}`}
                        onSubmit={handleSubmitForm}
                        data-testid={`form-${item.id}`}
                      >
                        <input
                          type="text"
                          name="description"
                          value={item.description}
                          onChange={(e) => handleChange(item.id, e)}
                          data-testid={`description-${item.id}`}
                        />
                      </form>
                    </TableCell>
                    <TableCell>
                      <form
                        name={`form-${item.id}`}
                        onSubmit={handleSubmitForm}
                        data-testid={`form-${item.id}`}
                      >
                        <input
                          type="text"
                          name="userId"
                          value={item.userId}
                          onChange={(e) => handleChange(item.id, e)}
                          data-testid={`userId-${item.id}`}
                        />
                      </form>
                    </TableCell>
                    <TableCell>
                      <form
                        name={`form-${item.id}`}
                        onSubmit={handleSubmitForm}
                        data-testid={`form-${item.id}`}
                      >
                        <input
                          type="text"
                          name="userName"
                          value={item.userName}
                          onChange={(e) => handleChange(item.id, e)}
                          data-testid={`userName-${item.id}`}
                        />
                      </form>
                    </TableCell>
                    <TableCell>
                      <form
                        name={`form-${item.id}`}
                        onSubmit={handleSubmitForm}
                        data-testid={`form-${item.id}`}
                      >
                        <input
                          type="number"
                          name="position"
                          value={item.position}
                          onChange={(e) => handleChange(item.id, e)}
                          data-testid={`position-${item.id}`}
                        />
                      </form>
                    </TableCell>
                    <TableCell>
                      <form
                        name={`form-${item.id}`}
                        onSubmit={handleSubmitForm}
                        data-testid={`form-${item.id}`}
                      >
                        <input
                          type="text"
                          name="rating"
                          value={item.rating}
                          onChange={(e) => handleChange(item.id, e)}
                          data-testid={`rating-${item.id}`}
                        />
                      </form>
                    </TableCell>
                    <TableCell>
                      <form
                        name={`form-${item.id}`}
                        onSubmit={handleSubmitForm}
                        data-testid={`form-${item.id}`}
                      >
                        <input
                          type="text"
                          name="status"
                          value={item.status}
                          onChange={(e) => handleChange(item.id, e)}
                          data-testid={`status-${item.id}`}
                        />
                      </form>
                    </TableCell>
                    <TableCell>
                      {moment(item.createdAt).format("MMM Do YY")}
                    </TableCell>
                    <TableCell>
                      {item.updatedAt
                        ? moment(item.updatedAt).format("MMM Do YY")
                        : ""}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#ccc",
                          color: "#000",
                          marginBottom: "20px",
                        }}
                        onClick={() => {
                          postForm("update", item.id)
                        }}
                        disabled={isLoading}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "red", color: "#000" }}
                        onClick={() => {
                          postForm("delete", item.id)
                        }}
                        disabled={isLoading}
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
