export const snippets = {
  javascript: `
// JavaScript example
const list = ["js", "css", "html", "react", "angular", "vue"];

for (int i = 0; i < list.length; i++) {
  console.log(list[i]);
}

console.log("Done!");
`,
  python: `
# Python 3 example
def say_hello():
  print('Hello, World')

for i in range(5):
  say_hello()
`,
  php: `
<?php

  // Php example
  for ( $i = 0; $i < 5; $i++) {
    echo "Hello, World";
  }
?>
`,
  c: `
#include <stdio.h>

int main() {
  for (int i = 0; i < 5; i++) {
    printf("Hello, World\\n");
  }
  return 0;
}
`,
  java: `
import java.io.*;
import java.util.*;

class Solution {
  public static void main(String[] args) {
    ArrayList<String> strings = new ArrayList<String>();
    strings.add("Hello, World!");
    strings.add("Welcome to CoderPad.");
    strings.add("This pad is running Java " + Runtime.version().feature());

    for (String string : strings) {
      System.out.println(string);
    }
  }
}
`,
  cpp: `
#include <iostream>
using namespace std;

int main() {
  auto words = { "Hello, ", "World!", "\\n" };
  for (const string& word : words) {
    cout << word;
  }
  return 0;
}
`,
};
