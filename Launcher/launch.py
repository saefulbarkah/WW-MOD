import os
import shutil
from tkinter import Tk
from tkinter.filedialog import askdirectory
from configparser import ConfigParser
import subprocess
import ctypes
import time
import signal

config = ConfigParser()


def checkConfigExists():
    return os.path.exists("config.ini")


def createDefaultConfig():
    if not checkConfigExists():
        config.add_section("CONFIG")
        config.set("CONFIG", "game_paks_directory", "")
        config.set("CONFIG", "game_executable_path", "")
        config.set("CONFIG", "mod_directory", "./~mod")
        with open("config.ini", "w") as configFile:
            config.write(configFile)
        print("config.ini created with default settings.")


def saveGameDirectory():
    root = Tk()
    root.withdraw()
    path = askdirectory(title="Select Wuthering Wave Folder")
    if path:
        config.read("config.ini")
        if not config.has_section("CONFIG"):
            config.add_section("CONFIG")
        # Set game directory
        gamePaksPath = os.path.join(
            path, "Wuthering Waves Game", "Client", "Content", "Paks"
        )
        gameExecutablePath = os.path.join(
            path,
            "Wuthering Waves Game",
            "Client",
            "Binaries",
            "Win64",
            "Client-Win64-Shipping.exe",
        )
        config.set("CONFIG", "game_executable_path", gameExecutablePath)
        config.set("CONFIG", "game_paks_directory", gamePaksPath)
        # Save config file
        with open("config.ini", "w") as configFile:
            config.write(configFile)
        print(f"Directory '{gamePaksPath}' saved to config.ini.")
    root.quit()


def checkAndSaveConfig():
    createDefaultConfig()
    config.read("config.ini")

    if not config.has_section("CONFIG"):
        print("CONFIG section is missing, creating default config.")
        createDefaultConfig()

    if not config.has_option("CONFIG", "game_paks_directory"):
        print("game_paks_directory not found, please select a directory.")
        saveGameDirectory()

    if not config.has_option("CONFIG", "mod_directory"):
        print("mod_directory not found, setting to default.")
        # Set mod_directory to default
        config.set("CONFIG", "mod_directory", "./~mod")
        with open("config.ini", "w") as configFile:
            config.write(configFile)
        print(f"Default mod_directory './~mod' saved to config.ini.")

    game_folder = config.get("CONFIG", "game_paks_directory").strip('"')

    if not game_folder:
        print("game_paks_directory is empty, please select a directory.")
        saveGameDirectory()


def loadConfig():
    config.read("config.ini")
    try:
        game_paks_directory = config.get("CONFIG", "game_paks_directory").strip('"')
        mod_directory = config.get("CONFIG", "mod_directory").strip('"')
        game_executable_path = config.get("CONFIG", "game_executable_path").strip('"')
        return game_paks_directory, mod_directory, game_executable_path
    except Exception as e:
        print(f"Error reading config: {e}")
        return None, None, None


def copyFolderToGameDirectory(target_directory, source_folder):
    target_folder = os.path.join(target_directory, os.path.basename(source_folder))
    try:
        if os.path.exists(target_folder):
            shutil.rmtree(target_folder)
        shutil.copytree(source_folder, target_folder)
        print(f"Folder '{source_folder}' successfully copied to '{target_folder}'.")
    except Exception as e:
        print(f"Error copying folder: {e}")


def runExecutableAsAdmin(executable_path, args=""):
    try:
        # Format command with arguments
        command = f'"{executable_path}" {args}'

        # Start the process as admin
        process = subprocess.Popen(
            [executable_path] + args.split(),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            shell=True,
            creationflags=subprocess.CREATE_NEW_CONSOLE,
            close_fds=True,
        )

        print("Game is running...")

        # Monitor process
        monitorProcess(process)

    except Exception as e:
        print(f"Error running executable: {e}")


def monitorProcess(process):
    try:
        while True:
            if process.poll() is not None:  # Check if the process has terminated
                print("Game has been closed.")
                break  # Exit the loop if the process has terminated

            time.sleep(5)  # Check every 5 seconds
    except KeyboardInterrupt:
        print("Stopping game due to interruption.")
        terminateProcess(process)


def terminateProcess(process):
    try:
        process.terminate()
        process.wait(timeout=5)
        print("Process terminated.")
    except subprocess.TimeoutExpired:
        print("Process did not terminate in time, killing...")
        process.kill()
        process.wait()
        print("Process killed.")


def deleteModDirectory(game_paks_directory, mod_directory):
    try:
        mod_folder_path = os.path.join(
            game_paks_directory, os.path.basename(mod_directory)
        )
        if os.path.exists(mod_folder_path):
            shutil.rmtree(mod_folder_path)
            print(f"Mod directory '{mod_folder_path}' has been deleted.")
        else:
            print(f"Mod directory '{mod_folder_path}' does not exist.")
    except Exception as e:
        print(f"Error deleting mod directory: {e}")


def runningGame():
    try:
        checkAndSaveConfig()
        game_paks_directory, mod_directory, game_executable_path = loadConfig()
        if game_paks_directory and mod_directory:
            if os.path.exists(mod_directory):
                copyFolderToGameDirectory(game_paks_directory, mod_directory)
                if os.path.exists(game_executable_path):
                    welcome()
                    runExecutableAsAdmin(game_executable_path, "-fileopenlog")
                    deleteModDirectory(
                        game_paks_directory, mod_directory
                    )  # Delete mod directory after game closes
                else:
                    print(
                        f"Executable '{game_executable_path}' does not exist. Try to delete config.ini"
                    )
            else:
                print(f"Mod directory '{mod_directory}' does not exist.")
        else:
            print("Invalid directories specified in config.")
    except Exception as e:
        print(f"Error in runningGame: {e}, try to delete config.ini")


def welcome():
    ascii_art = """

___  ___  ___  _   _ _   _ _____  ___  ______________ 
|  \\/  | / _ \\| | | | \\ | |  __ \\ |  \\/  |  _  |  _  \\
| .  . |/ /_\\ \\ | | |  \\| | |  \\/ | .  . | | | | | | |
| |\\/| ||  _  | | | | . ` | | __  | |\\/| | | | | | | |
| |  | || | | | |_| | |\\  | |_\\ \\ | |  | \\ \\_/ / |/ / 
\\_|  |_/_| |_/_\\___/\\_| \\_/\\____/ \\_|  |_/_\\___/|___/
                                                      
                                                      

                                         
"""
    print(ascii_art)


if __name__ == "__main__":
    runningGame()
