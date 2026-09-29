Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile("C:\Users\JacobCromwell\.gemini\antigravity-ide\brain\58b67bd0-9578-4ea6-8947-d194644420d7\jacob_stardew_sprite_1790462434824.jpg")
$w = $img.Width
$h = $img.Height
for($x=0; $x -lt $w; $x++) {
  for($y=0; $y -lt $h; $y++) {
    $c = $img.GetPixel($x, $y)
    if ($c.R -gt 230 -and $c.G -gt 230 -and $c.B -gt 230) {
      $img.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
    }
  }
}
$img.Save("c:\Users\JacobCromwell\OneDrive - Atlantic Digital Safety\Documents\Client Files\Jacob Cromwell\Updated Site\images\sprite.png", [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
