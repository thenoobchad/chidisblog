

export default function Sidebar() {
  return (
		<div className=" w-full py-4 flex flex-col lg:sticky top-0 lg:pr-6">
			<h1 className="font-bold my-3 w-full ">Subscribe to Our Newsletter</h1>
			<p className="text-xs text-justify leading-4.5">
				The world moves fast. We help you keep up. Subscribe to get a curated
				digest of the most significant global events, cultural shifts, and
				stories you might have missed—delivered straight to your inbox.
			</p>
			<div className="outline w-fit my-4 shadow-[6px_6px_0px_#000] whitespace-nowrap">
				<input
					type="email"
					placeholder="Enter your email"
					className="px-4 max-w-75 outline-none text-sm"
				/>
				<button className="bg-green-950 text-white p-2 text-sm uppercase">Subscribe</button>
			</div>
		</div>
	);
}
