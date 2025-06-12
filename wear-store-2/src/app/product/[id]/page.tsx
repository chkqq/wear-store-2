import ProductPage from "@/pages/productPage"

export default function Page({ params }: { params: { id: string } }) {
  // Явно передаём id как строку
  return <ProductPage productId={params.id} />
}