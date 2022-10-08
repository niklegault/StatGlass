import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
        title: 'Welcome to Flutter',
        home: Scaffold(
          backgroundColor: Color.fromARGB(252, 102, 171, 239),
          body: Align(
            alignment: Alignment.topCenter,
            child: Text(
              'Hi Mom!',
              selectionColor: Color.fromARGB(255, 44, 82, 150),
              textScaleFactor: 5,
            ),
          ),
        ));
  }
}
