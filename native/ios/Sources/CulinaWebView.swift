import SwiftUI
import WebKit

struct CulinaWebView: UIViewRepresentable {
    let path: String
    private let allowedHost = "culinalink-texas-mcczce.v2.appdeploy.ai"
    func makeCoordinator() -> Coordinator { Coordinator(allowedHost: allowedHost) }
    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.websiteDataStore = .default()
        let webView = WKWebView(frame: .zero, configuration: configuration)
        webView.navigationDelegate = context.coordinator
        webView.allowsBackForwardNavigationGestures = true
        if let url = URL(string: "https://\(allowedHost)\(path)") { webView.load(URLRequest(url: url, cachePolicy: .useProtocolCachePolicy, timeoutInterval: 30)) }
        return webView
    }
    func updateUIView(_ webView: WKWebView, context: Context) {}
    final class Coordinator: NSObject, WKNavigationDelegate {
        let allowedHost: String
        init(allowedHost: String) { self.allowedHost = allowedHost }
        func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
            guard let url = navigationAction.request.url else { decisionHandler(.cancel); return }
            if url.scheme == "https" && url.host == allowedHost { decisionHandler(.allow); return }
            if ["http", "https"].contains(url.scheme ?? "") { UIApplication.shared.open(url) }
            decisionHandler(.cancel)
        }
    }
}
