import axios from 'axios'

export async function fetchCourses(): Promise<CourseProps[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const response = await axios.get('http://ec2-63-34-145-237.eu-west-1.compute.amazonaws.com/msb/coursereview/list')

  return response.data.courseReviews
}

export async function updateCourses(data: CourseProps, fn: () => void) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const res = axios.post('http://ec2-63-34-145-237.eu-west-1.compute.amazonaws.com/msb/coursereview/list', data, {
    headers: {
      SYSTEM: 'SYSTEM'
    }
  }).then(() => fn()).catch((error) => console.error(error))

  return res
}

export async function deleteCourses(data: CourseProps, fn: () => void) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const res = axios.delete(`http://ec2-63-34-145-237.eu-west-1.compute.amazonaws.com/msb/coursereview?id${data.id}`).then(() => fn()).catch((error) => console.error(error))

  return res
}