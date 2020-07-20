from setuptools import setup

#APP would be the name of the file your code is in.
APP = ['part_manager.py']
DATA_FILES = ['../icon.gif']
#The Magic is in OPTIONS.
OPTIONS = {
    'argv_emulation': False,
    'iconfile': '../icon.gif', #change app.icns to the image file name!!!
    }

setup(
    app=APP,
    name='Yazeeds Scheduler', #change to anything
    data_files=DATA_FILES,
    options={'py2app': OPTIONS},
    setup_requires=['py2app'],
)