import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import App from "./App.tsx"

const queryClient = new QueryClient()

export default function AppQuery() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  )
}
