import AdminSidebar from '../../components/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar />
      <main className="flex-1 ml-60 p-8">{children}</main>
    </div>
  )
}
