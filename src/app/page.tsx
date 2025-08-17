export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Magic: The Gathering Card Index
        </h1>
        <p className="text-sm text-text-muted">
          Browse and search through Magic: The Gathering cards with advanced
          filtering options.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <p className="text-sm text-text-muted">
          Card grid and filters coming soon... Click the hamburger menu to see
          the sidebar toggle!
        </p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              📱 Mobile
            </h3>
            <p className="text-xs text-text-muted">Overlay sidebar</p>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              📟 Tablet
            </h3>
            <p className="text-xs text-text-muted">Wider sidebar</p>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              💻 Desktop
            </h3>
            <p className="text-xs text-text-muted">Static sidebar</p>
          </div>
        </div>
      </div>
    </div>
  );
}
