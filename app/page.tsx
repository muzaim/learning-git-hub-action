export default function HomePage() {
	return (
		<main
			style={{
				textAlign: "center",
				padding: "60px 20px",
				backgroundColor: "#f0f4f8",
				minHeight: "100vh",
			}}
		>
			<div
				style={{
					background: "white",
					padding: "40px",
					borderRadius: "16px",
					display: "inline-block",
					boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
				}}
			>
				<h1 style={{ color: "#0969da", marginBottom: "10px" }}>
					🚀 Next.js Enterprise Pipeline!
				</h1>
				<p style={{ color: "#57606a", fontSize: "18px" }}>
					Aplikasi ini di-build dan di-deploy otomatis via SSH ke Mac
					lokal!
				</p>
				<span
					style={{
						background: "#dafbe1",
						color: "#1a7f37",
						padding: "6px 16px",
						borderRadius: "20px",
						fontWeight: "bold",
					}}
				>
					Status: Production Ready 🟢
				</span>
			</div>
		</main>
	);
}
