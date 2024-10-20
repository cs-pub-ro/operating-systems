/* SPDX-License-Identifier: BSD-3-Clause */

#include <iostream>

class Student {
	public:
		Student(std::string name, unsigned int age, std::string favorite_os);
		void Print() const;

	private:
		std::string name_;
		unsigned int age_;
		std::string favorite_os_;
};

Student::Student(std::string name, unsigned int age, std::string favorite_os)
	: name_(name), age_(age), favorite_os_(favorite_os)
{
}

void Student::Print() const
{
	std::cout << name_ << " is " << age_ << " years old";
	std::cout << " and likes " << favorite_os_ << std::endl;
}

int main(void)
{
	Student *s;

	s = new Student("Linus Torvalds", 22, "Linux");
	s->Print();

	/* TODO 1: Solve memory leaks. */
	delete s;

	s = new Student("Steve Jobs", 23, "macOS");
	s->Print();

	/* REMOVE 2 */
	delete s;

	/* TODO 1: Print size of student. */
	std::cout << "Size of class Student: " << sizeof(Student) << "\n";

	return 0;
}
