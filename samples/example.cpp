/**
 * Theme test: C++
 *
 * Covers: templates, namespaces, classes, inheritance, lambdas,
 * smart pointers, concepts, ranges, structured bindings, constexpr.
 */

#include <algorithm>
#include <concepts>
#include <format>
#include <iostream>
#include <map>
#include <memory>
#include <numeric>
#include <optional>
#include <ranges>
#include <string>
#include <variant>
#include <vector>

// ── Preprocessor ────────────────────────────────────────────────────

#define MAX_SIZE 1024
#ifndef VERSION
#define VERSION "0.1.0"
#endif

#pragma once

// ── Namespaces ──────────────────────────────────────────────────────

namespace remedy::theme {

// ── Concepts ────────────────────────────────────────────────────────

template <typename T>
concept Printable = requires(T t) {
    { std::cout << t } -> std::same_as<std::ostream&>;
};

template <typename T>
concept Numeric = std::integral<T> || std::floating_point<T>;

// ── Enums ───────────────────────────────────────────────────────────

enum class Status : uint8_t {
    Pending = 0,
    Active = 1,
    Disabled = 2,
};

// ── Constants ───────────────────────────────────────────────────────

constexpr int MAX_RETRIES = 3;
constexpr double PI = 3.14159265358979;
constexpr auto GREETING = "Hello, Remedy!";

// ── Structs & Classes ───────────────────────────────────────────────

struct Point {
    double x{0.0};
    double y{0.0};

    constexpr double magnitude() const {
        return std::sqrt(x * x + y * y);
    }

    auto operator<=>(const Point&) const = default;

    friend std::ostream& operator<<(std::ostream& os, const Point& p) {
        return os << std::format("({:.2f}, {:.2f})", p.x, p.y);
    }
};

template <Printable T>
class Repository {
public:
    using ItemMap = std::map<int, std::shared_ptr<T>>;

    void add(int id, T item) {
        items_[id] = std::make_shared<T>(std::move(item));
    }

    [[nodiscard]] std::optional<std::shared_ptr<T>> find(int id) const {
        if (auto it = items_.find(id); it != items_.end()) {
            return it->second;
        }
        return std::nullopt;
    }

    [[nodiscard]] size_t size() const noexcept { return items_.size(); }

    // Range-based iteration
    auto begin() const { return items_.begin(); }
    auto end() const { return items_.end(); }

private:
    ItemMap items_;
};

// ── Inheritance ─────────────────────────────────────────────────────

class Shape {
public:
    virtual ~Shape() = default;
    virtual double area() const = 0;
    virtual std::string name() const = 0;
};

class Circle final : public Shape {
public:
    explicit Circle(double radius) : radius_(radius) {}

    double area() const override {
        return PI * radius_ * radius_;
    }

    std::string name() const override { return "Circle"; }

private:
    double radius_;
};

// ── Templates & Variadic ────────────────────────────────────────────

template <Numeric... Args>
constexpr auto sum(Args... args) {
    return (args + ...);
}

template <typename T>
    requires std::copyable<T>
class Stack {
    std::vector<T> data_;

public:
    void push(const T& value) { data_.push_back(value); }

    [[nodiscard]] std::optional<T> pop() {
        if (data_.empty()) return std::nullopt;
        T val = std::move(data_.back());
        data_.pop_back();
        return val;
    }

    [[nodiscard]] bool empty() const noexcept { return data_.empty(); }
};

// ── Variant & Visit ─────────────────────────────────────────────────

using Value = std::variant<int, double, std::string, bool>;

std::string describe(const Value& v) {
    return std::visit(
        [](auto&& arg) -> std::string {
            using T = std::decay_t<decltype(arg)>;
            if constexpr (std::is_same_v<T, int>) {
                return std::format("int: {}", arg);
            } else if constexpr (std::is_same_v<T, double>) {
                return std::format("double: {:.4f}", arg);
            } else if constexpr (std::is_same_v<T, std::string>) {
                return std::format("string: \"{}\"", arg);
            } else if constexpr (std::is_same_v<T, bool>) {
                return arg ? "true" : "false";
            }
        },
        v);
}

}  // namespace remedy::theme

// ── Main ────────────────────────────────────────────────────────────

int main() {
    using namespace remedy::theme;

    // Structured bindings
    auto [x, y] = Point{3.0, 4.0};
    std::cout << std::format("x={}, y={}, mag={:.4f}\n", x, y, Point{x, y}.magnitude());

    // Ranges & lambdas
    std::vector<int> numbers{5, 3, 8, 1, 9, 2, 7, 4, 6};

    auto even_squares = numbers
        | std::views::filter([](int n) { return n % 2 == 0; })
        | std::views::transform([](int n) { return n * n; });

    for (int val : even_squares) {
        std::cout << val << ' ';
    }
    std::cout << '\n';

    // Smart pointers & polymorphism
    std::vector<std::unique_ptr<Shape>> shapes;
    shapes.push_back(std::make_unique<Circle>(5.0));

    for (const auto& shape : shapes) {
        std::cout << std::format("{}: area = {:.2f}\n", shape->name(), shape->area());
    }

    // Variadic template
    constexpr auto total = sum(1, 2.5, 3, 4.5);
    std::cout << std::format("Sum: {}\n", total);

    // Variant
    Value v = std::string("Remedy");
    std::cout << describe(v) << '\n';

    return 0;
}
