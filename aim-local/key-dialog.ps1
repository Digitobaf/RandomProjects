$ErrorActionPreference = 'Stop'
try {
    Add-Type -AssemblyName System.Windows.Forms
    Add-Type -AssemblyName System.Drawing
    [System.Windows.Forms.Application]::EnableVisualStyles()
    $envFile = $env:AIM_ENV_PATH
    if ([string]::IsNullOrWhiteSpace($envFile)) { exit 1 }

    $form = New-Object System.Windows.Forms.Form
    $form.Text = 'Connect Abby to Gemini'
    $form.ClientSize = New-Object System.Drawing.Size(540, 245)
    $form.StartPosition = 'CenterScreen'
    $form.FormBorderStyle = 'FixedDialog'
    $form.MaximizeBox = $false
    $form.MinimizeBox = $false
    $form.TopMost = $true
    $form.Font = New-Object System.Drawing.Font('Segoe UI', 10)

    $instructions = New-Object System.Windows.Forms.Label
    $instructions.Text = 'Paste your Gemini API key below, then choose Save key.'
    $instructions.Location = New-Object System.Drawing.Point(20, 18)
    $instructions.Size = New-Object System.Drawing.Size(500, 26)
    $form.Controls.Add($instructions)

    $field = New-Object System.Windows.Forms.TextBox
    $field.Location = New-Object System.Drawing.Point(20, 55)
    $field.Size = New-Object System.Drawing.Size(500, 30)
    $field.MaxLength = 220
    $field.ShortcutsEnabled = $true
    $field.UseSystemPasswordChar = $false
    $field.TabIndex = 0
    $form.Controls.Add($field)

    $show = New-Object System.Windows.Forms.CheckBox
    $show.Text = 'Show key'
    $show.Location = New-Object System.Drawing.Point(20, 95)
    $show.Size = New-Object System.Drawing.Size(120, 26)
    $show.Checked = $true
    $show.TabIndex = 1
    $show.Add_CheckedChanged({ $field.UseSystemPasswordChar = -not $show.Checked })
    $form.Controls.Add($show)

    $note = New-Object System.Windows.Forms.Label
    $note.Text = 'Saved in aim-local\.env on this computer. Not added to your chat.'
    $note.Location = New-Object System.Drawing.Point(20, 130)
    $note.Size = New-Object System.Drawing.Size(500, 26)
    $form.Controls.Add($note)

    $errorLabel = New-Object System.Windows.Forms.Label
    $errorLabel.ForeColor = [System.Drawing.Color]::DarkRed
    $errorLabel.Location = New-Object System.Drawing.Point(20, 157)
    $errorLabel.Size = New-Object System.Drawing.Size(500, 30)
    $form.Controls.Add($errorLabel)

    $save = New-Object System.Windows.Forms.Button
    $save.Text = 'Save key'
    $save.Location = New-Object System.Drawing.Point(290, 195)
    $save.Size = New-Object System.Drawing.Size(110, 32)
    $save.TabIndex = 2
    $save.Add_Click({
        $key = $field.Text.Trim()
        if ($key -notmatch '^[A-Za-z0-9_-]{20,200}$') {
            $errorLabel.Text = 'Paste the full API key from Google AI Studio.'
            $field.Focus()
            return
        }
        try {
            $kept = @()
            if ([System.IO.File]::Exists($envFile)) {
                $kept = @([System.IO.File]::ReadAllLines($envFile) | Where-Object { $_ -notmatch '^\s*GEMINI_API_KEY\s*=' })
            }
            if (-not ($kept | Where-Object { $_ -match '^\s*GEMINI_MODEL\s*=' })) {
                $kept += 'GEMINI_MODEL=gemini-3.1-flash-lite'
            }
            $lines = @('GEMINI_API_KEY=' + $key) + $kept
            $encoding = New-Object System.Text.UTF8Encoding($false)
            [System.IO.File]::WriteAllText($envFile, ($lines -join "`r`n") + "`r`n", $encoding)
            $field.Clear()
            $form.DialogResult = [System.Windows.Forms.DialogResult]::OK
            $form.Close()
        } catch {
            $errorLabel.Text = 'Could not save. Extract the app to a folder you can write to.'
        }
    })
    $form.Controls.Add($save)

    $cancel = New-Object System.Windows.Forms.Button
    $cancel.Text = 'Cancel'
    $cancel.Location = New-Object System.Drawing.Point(410, 195)
    $cancel.Size = New-Object System.Drawing.Size(110, 32)
    $cancel.DialogResult = [System.Windows.Forms.DialogResult]::Cancel
    $cancel.TabIndex = 3
    $form.Controls.Add($cancel)
    $form.AcceptButton = $save
    $form.CancelButton = $cancel
    $form.Add_Shown({ $form.Activate(); $field.Focus() })
    $result = $form.ShowDialog()
    $form.Dispose()
    if ($result -eq [System.Windows.Forms.DialogResult]::OK) { exit 0 }
    exit 2
} catch {
    exit 1
}
