import FileUpload from "./components/ui/FileUpload";
function App() {
  return (
    <div className="min-h-screen bg-gray-900">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 py-20">
        <div className="container mx-auto px-6 text-center">
          <FileUpload/>
        </div>
      </section>


    </div>
  );
}

export default App;
