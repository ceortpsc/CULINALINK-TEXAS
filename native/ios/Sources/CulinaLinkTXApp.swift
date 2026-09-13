import SwiftUI

@main
struct CulinaLinkTXApp: App {
    var body: some Scene {
        WindowGroup { RootView().tint(Color(red: 0.83, green: 0.63, blue: 0.23)) }
    }
}

struct RootView: View {
    @State private var selection = 0
    var body: some View {
        TabView(selection: $selection) {
            CulinaWebView(path: "/discover/").tabItem { Label("Discover", systemImage: "magnifyingglass") }.tag(0)
            CulinaWebView(path: "/orders/").tabItem { Label("Orders", systemImage: "bag") }.tag(1)
            CulinaWebView(path: "/andreaa/").tabItem { Label("Andreaa", systemImage: "message") }.tag(2)
            CulinaWebView(path: "/dashboard/").tabItem { Label("Account", systemImage: "person.crop.circle") }.tag(3)
        }
    }
}
