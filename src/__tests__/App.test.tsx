/**
 * @jest-environment jsdom
 */

import { ReactNode } from "react"
import { expect, test, vi } from "vitest"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import App from "@/App"
import * as service from "@/services/api/courses"
import data from "@/services/data/data.json"

vi.mock("./services/api/courses.ts")

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

const renderWithClient = (ui: ReactNode) => {
  const queryClient = createTestQueryClient()
  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </MemoryRouter>,
  )
}

test("check input elements for the first row are rendered on the page", () => {
  const app = renderWithClient(<App />)

  expect(app.findByTestId("form-64")).toBeTruthy()
  expect(app.findByTestId("courseid-64")).toBeTruthy()
  expect(app.findByTestId("name-64")).toBeTruthy()
  expect(app.findByTestId("description-64")).toBeTruthy()
  expect(app.findByTestId("userId-64")).toBeTruthy()
  expect(app.findByTestId("userName-64")).toBeTruthy()
  expect(app.findByTestId("rating-64")).toBeTruthy()
  expect(app.findByTestId("status-64")).toBeTruthy()
  expect(app.findByTestId("courseid-64")).toBeTruthy()
  expect(app.findByTestId("courseid-64")).toBeTruthy()

  app.unmount()
})

test("mock api call", () => {
  const mockFetchCourses = vi.spyOn(service, "fetchCourses")
  mockFetchCourses.mockResolvedValue(data.courseReviews)
  mockFetchCourses.mockReturnValue(new Promise(() => data.courseReviews))

  renderWithClient(<App />)

  expect(mockFetchCourses).toHaveBeenCalled()
  expect(mockFetchCourses).toReturnWith(new Promise(() => data.courseReviews))
})
