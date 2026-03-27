$hugo = Start-Process -PassThru -NoNewWindow hugo -ArgumentList "server", "-D", "--bind", "0.0.0.0", "--baseURL", "http://0.0.0.0"
try {
    while ($true) {
        $output = git pull origin cms-draft 2>&1
        if ($output -notmatch "Already up to date") { Write-Host $output }
        Start-Sleep -Seconds 30
    }
} finally {
    Stop-Process -Id $hugo.Id -ErrorAction SilentlyContinue
}
