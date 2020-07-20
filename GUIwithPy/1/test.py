import tkinter as tk

 
root = tk.Tk()
root.title("Cluster - Created by Yazeed")

#canvas = tk.Canvas(root, height=7000, width=700, bg="white")
#canvas.pack()

frame = tk.Frame(root, bg="white")
frame.place(relwidth=0.8 , relheight=0.8, relx = 0.1, rely = 0.1)

button = tk.Button(root, text='Open File', width=10, command=root.destroy)
button.pack()
root.mainloop()