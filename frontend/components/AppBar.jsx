export function AppBar(props) {
  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">
        PayYourFren App
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
          Hello {props.username}
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {props.logo}
          </div>
        </div>
      </div>
    </div>
  );
}
