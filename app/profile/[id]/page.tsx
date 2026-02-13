'use clients'


interface PageProps {
  params: {
    id: string;
  };
}

function page({ params }: PageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
       <h1>Profile Page</h1>
       <h2 className="P-3 bg-green-500 rounded text-black">{params.id}</h2>
    </div>
  )
}

export default page
