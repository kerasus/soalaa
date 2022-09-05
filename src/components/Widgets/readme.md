The In order to make new widgets, please note that: <br>
0- Make sure put your widget inside of folder, like other widgets. <br>
1- Name of the widget folder and vue file **should** be exactly the same. If not, your widget will not register. <br>
2- You can have as many category folder as you want, but you cannot have empty category folder. <br>
3- Design of dependencies of a widget is up to you. make sure import parts in your main vue file correctly.
Dynamic module importer will import just your main vue file that has the same name with the folder. <br>
4- If you want to make it possible to get styles and classes as options from your page (which you load PageBuilder inside it) you should add mixinWidget as mixin inside your widget. see testComponent1.vue as an example.
