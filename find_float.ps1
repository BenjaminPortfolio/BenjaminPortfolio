$css = Get-Content 'd:\benjamin portfolio\BenjaminPortfolio\dist\assets\index-D_n2VyL4.css' -Raw
[regex]::Matches($css, '\._float_[a-z0-9]+_\d+\{[^}]*\}') | ForEach-Object { $_.Value }
