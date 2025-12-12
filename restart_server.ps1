Stop-Process -Name node -Force -ErrorAction SilentlyContinue
if (Test-Path ".next/dev/lock") {
    Remove-Item ".next/dev/lock" -Force
}
npm run dev
