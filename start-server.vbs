Set objShell = CreateObject("WScript.Shell")

objShell.Run "cmd /c cd /d " & Chr(34) & "C:\Users\22582\music-psychology-ai" & Chr(34) & " && py server.py", 0, False
