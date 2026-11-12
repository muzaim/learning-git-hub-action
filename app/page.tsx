import React from "react";

export default function Home() {
	const port = process.env.PORT || "3000";
	const appEnv = process.env.APP_ENV || "unknown";
	const appName = process.env.NEXT_PUBLIC_APP_NAME || "Default Next.js App";
	const apiUrl =
		process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

	return (
		<main
			style={{
				padding: "2rem",
				fontFamily: "system-ui, sans-serif",
				maxWidth: "600px",
				margin: "0 auto",
			}}
		>
			<h1 data-testid="main-title" style={{ color: "#0070f3" }}>
				{appName}
			</h1>
			<p>
				Aplikasi Next.js TypeScript dengan implementasi Environment
				Variables & Pipeline CI/CD.
			</p>

			<div
				style={{
					marginTop: "1.5rem",
					padding: "1.2rem",
					border: "1px solid #e1e4e8",
					borderRadius: "8px",
					backgroundColor: "#f6f8fa",
				}}
			>
				<h3 style={{ marginTop: 0 }}>
					⚙️ Konfigurasi Environment (ENV)
				</h3>
				<ul style={{ lineHeight: "1.8" }}>
					<li>
						<strong>App Name:</strong> {appName}
					</li>
					<li>
						<strong>Environment:</strong>{" "}
						<span
							style={{
								backgroundColor: "#e1e4e8",
								padding: "2px 6px",
								borderRadius: "4px",
							}}
						>
							{appEnv}
						</span>
					</li>
					<li>
						<strong>Internal Port:</strong> {port}
					</li>
					<li>
						<strong>Backend API URL:</strong> <code>{apiUrl}</code>
					</li>
				</ul>
			</div>
		</main>
	);
}
