'use client';

import { motion } from 'framer-motion';
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from 'react';
import { cn } from "@/lib/utils";


// 示例代码常量
const goExample = `// CalculateDiscount calculates product discount based on user type
// VIP users get 20% off, regular users get 10% off
func CalculateDiscount(originalPrice float64, userType string) (float64, error) {
    // Prepare request parameters
    requestBody := map[string]interface{}{
        "originalPrice": originalPrice,
        "userType":     userType,
    }
    
    // Convert to JSON
    jsonData, err := json.Marshal(requestBody)
    if err != nil {
        return 0, fmt.Errorf("marshal request failed: %w", err)
    }
    
    // Call Pathless API
    resp, err := http.Post(
        "https://axovcyuykttb.sealoshzh.site/api/v1/functions/YOUR_FUNCTION_ID/execute",
        "application/json",
        bytes.NewBuffer(jsonData),
    )
    if err != nil {
        return 0, fmt.Errorf("call pathless failed: %w", err)
    }
    defer resp.Body.Close()
    
    // Read response
    body, err := io.ReadAll(resp.Body)
    if err != nil {
        return 0, fmt.Errorf("read response failed: %w", err)
    }
    
    // Parse response
    var result struct {
        Data struct {
            Discount float64 \`json:"discount"\`
        } \`json:"data"\`
    }
    if err := json.Unmarshal(body, &result); err != nil {
        return 0, fmt.Errorf("unmarshal response failed: %w", err)
    }
    
    return result.Data.Discount, nil
}`;

const pythonExample = `import requests
from typing import Tuple

def calculate_discount(original_price: float, user_type: str) -> Tuple[float, str]:
    """
    Calculate product discount based on user type.
    
    Args:
        original_price: Original price of the product
        user_type: Type of user ("VIP" or "NORMAL")
        
    Returns:
        Tuple of (discounted_price, error_message)
    """
    try:
        response = requests.post(
            "https://axovcyuykttb.sealoshzh.site/api/v1/functions/YOUR_FUNCTION_ID/execute",
            json={
                "originalPrice": original_price,
                "userType": user_type
            }
        )
        response.raise_for_status()
        result = response.json()
        return result["data"]["discount"], None
    except requests.exceptions.RequestException as e:
        return 0, f"API call failed: {str(e)}"
    except (KeyError, ValueError) as e:
        return 0, f"Invalid response format: {str(e)}"`;

const errorHandlingExample = `// Recommended error handling approach
resp, err := http.Post(pathlessURL, "application/json", bytes.NewBuffer(jsonData))
if err != nil {
    return 0, fmt.Errorf("pathless api error: %w", err)
}
if resp.StatusCode != http.StatusOK {
    body, _ := io.ReadAll(resp.Body)
    return 0, fmt.Errorf("pathless api failed: status=%d body=%s", resp.StatusCode, body)
}`;

const performanceExample = `// Use global HTTP client
var client = &http.Client{
    Timeout: 5 * time.Second,
    Transport: &http.Transport{
        MaxIdleConns:        100,
        MaxIdleConnsPerHost: 100,
        IdleConnTimeout:     90 * time.Second,
    },
}

// Use in function
resp, err := client.Post(pathlessURL, "application/json", bytes.NewBuffer(jsonData))`;


// Example code for symbolic implementation
const symbolCode = `// UserType represents customer classification
type UserType string

const (
    VIPUser     UserType = "VIP"
    RegularUser UserType = "Regular"
)

// DiscountRequest represents the API request structure
type DiscountRequest struct {
    OriginalPrice float64  \`json:"originalPrice"\`
    UserType      UserType \`json:"userType"\`
}

// DiscountResponse represents the API response structure
type DiscountResponse struct {
    Data struct {
        Discount float64 \`json:"discount"\`
    } \`json:"data"\`
}

// CalculateDiscount calculates the discounted price based on user type
// VIP users get 20% off, Regular users get 10% off
// Returns: discounted price and error if any
func CalculateDiscount(price float64, userType UserType) (float64, error) {
    // Compose the calculation pipeline
    return pipe(
        validateInput(price, userType),
        createRequest,
        sendRequest,
        parseResponse,
    )
}

// Pure functions for each step
func validateInput(price float64, userType UserType) (*DiscountRequest, error) {
    if price < 0 {
        return nil, fmt.Errorf("price cannot be negative")
    }
    if userType != VIPUser && userType != RegularUser {
        return nil, fmt.Errorf("invalid user type")
    }
    return &DiscountRequest{OriginalPrice: price, UserType: userType}, nil
}

func createRequest(req *DiscountRequest) (*http.Request, error) {
    jsonData, err := json.Marshal(req)
    if err != nil {
        return nil, fmt.Errorf("failed to marshal request: %w", err)
    }
    
    return http.NewRequest(
        "POST",
        "https://axovcyuykttb.sealoshzh.site/api/v1/functions/7bbe9ef9-8dbe-4e18-bbf3-3c36bfc07897/execute",
        bytes.NewBuffer(jsonData),
    )
}

func sendRequest(req *http.Request) ([]byte, error) {
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return nil, fmt.Errorf("failed to send request: %w", err)
    }
    defer resp.Body.Close()
    
    return ioutil.ReadAll(resp.Body)
}

func parseResponse(data []byte) (float64, error) {
    var response DiscountResponse
    if err := json.Unmarshal(data, &response); err != nil {
        return 0, fmt.Errorf("failed to parse response: %w", err)
    }
    return response.Data.Discount, nil
}

// Helper function to compose the pipeline
func pipe(
    f1 func(float64, UserType) (*DiscountRequest, error),
    f2 func(*DiscountRequest) (*http.Request, error),
    f3 func(*http.Request) ([]byte, error),
    f4 func([]byte) (float64, error),
) func(float64, UserType) (float64, error) {
    return func(price float64, userType UserType) (float64, error) {
        req, err := f1(price, userType)
        if err != nil {
            return 0, err
        }
        
        httpReq, err := f2(req)
        if err != nil {
            return 0, err
        }
        
        respData, err := f3(httpReq)
        if err != nil {
            return 0, err
        }
        
        return f4(respData)
    }
}`;

// Example code for Pathless implementation
const pathlessCode = `// This function calculates product discounts based on user type.VIP users receive a 20% discount, regular users receive a 10% discount.
func CalculateDiscount(originalPrice float64, userType string) (float64, error) {
    // Prepare request body with input parameters
    requestBody := map[string]interface{}{
        "originalPrice": originalPrice,
        "userType": userType,
    }
    // Convert request body to JSON
    jsonData, err := json.Marshal(requestBody)
    if err != nil {
        return 0, fmt.Errorf("failed to marshal request body: %v", err)
    }
    // Send POST request to Pathless API endpoint
    resp, err := http.Post("https://axovcyuykttb.sealoshzh.site/api/v1/functions/7bbe9ef9-8dbe-4e18-bbf3-3c36bfc07897/execute", "application/json", bytes.NewBuffer(jsonData))
    if err != nil {
        return 0, fmt.Errorf("failed to send request to Pathless API: %v", err)
    }
    defer resp.Body.Close()
    // Read response body
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        return 0, fmt.Errorf("failed to read response body: %v", err)
    }
    // Parse response JSON into result struct
    var result struct {
        Data struct {
            Discount float64 \`json:"discount"\`
        } \`json:"data"\`
    }
    if err := json.Unmarshal(body, &result); err != nil {
        return 0, fmt.Errorf("failed to unmarshal response body: %v", err)
    }
    return result.Data.Discount, nil
}`;

// Interface definitions for API response and request
interface GenerateResponse {
  function_id: string;  // Unique identifier for the generated function
  code: string;        // Generated code content
}

interface GenerateRequest {
  description: string;  // User's requirement description
  language: string;    // Target programming language
}

const configExample = `{
  "name": "calculateDiscount",
  "schema": {
    "type": "object",
    "properties": {
      "discount": {
        "type": "number",
        "description": "discounted price"
      }
    }
  },
  "background": "Calculate product discount price:\\n1. VIP users get 20% discount\\n2. Regular users get 10% discount\\n3. Original price must be greater than 0\\n4. User type must be either VIP or NORMAL",
  "examples": [{
    "input": {
      "originalPrice": 100,
      "userType": "VIP"
    },
    "output": {
      "discount": 80
    }
  }]
}`;

// 首先在组件内添加一个自定义的滚动条样式类
const scrollbarStyle = {
  scrollbarWidth: 'thin',
  scrollbarColor: 'rgba(255, 255, 255, 0.1) transparent',
  '&::-webkit-scrollbar': {
    width: '4px',
    height: '4px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: 'rgba(255, 255, 255, 0.2)',
  }
} as const;

// 修改暗色滚动条样式为更深的黑色
const darkScrollbarStyle = {
  scrollbarWidth: 'thin',
  scrollbarColor: 'rgba(0, 0, 0, 0.6) transparent',
  '&::-webkit-scrollbar': {
    width: '4px',
    height: '4px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(0, 0, 0, 0.6)',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: 'rgba(0, 0, 0, 0.8)',
  }
} as const;

// 在文件顶部其他常量定义附近添加
const createFunctionRules = `{
  "name": "Function name",
  "schema": "Output schema in JSON format",
  "background": "Business rules and constraints",
  "examples": [{
    "input": "Example input",
    "output": "Expected output"
  }]
}`;

export default function PathlessPage() {
  // State management for the page
  const [activeTab, setActiveTab] = useState("sample");          // Current active tab
  const [description, setDescription] = useState("");            // User input description
  const [language, setLanguage] = useState("");                  // Selected programming language
  const [isGenerating, setIsGenerating] = useState(false);      // Loading state for code generation
  const [generatedCode, setGeneratedCode] = useState<GenerateResponse | null>(null);  // Generated code result
  const [showModal, setShowModal] = useState(false);            // Modal visibility control

  // 添加 Cloud 表单的状态
  const [functionName, setFunctionName] = useState("CalculateDiscount");
  const [outputSchema, setOutputSchema] = useState("float64");
  const [background, setBackground] = useState("Discount calculation rules: 20% off for VIP, 10% off for regular users");
  const [examples, setExamples] = useState([
    {
      input: {
        userType: "VIP",
        price: 100
      },
      output: {
        discount: 80.0
      }
    }
  ]);

  // 在 PathlessPage 组件内添加 toast 状态
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // 添加新的状态来控制代码模态框
  const [codeModal, setCodeModal] = useState<{
    show: boolean;
    code: string;
    language: string;
    title: string;
  }>({
    show: false,
    code: '',
    language: '',
    title: ''
  });

  // 添加打开模态框的处理函数
  const handleViewFullCode = (code: string, language: string, title: string) => {
    setCodeModal({
      show: true,
      code,
      language,
      title
    });
  };

  // Handle code generation request
  const handleGenerate = async () => {
    if (!description || !language) {
      return;
    }

    setIsGenerating(true);
    setShowModal(true);

    try {
      // Send API request to generate code
      const response = await fetch("https://axovcyuykttb.sealoshzh.site/api/v1/website/functions/prepare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
          language,
        }),
      });

      const data = await response.json();
      setGeneratedCode(data);
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // 处理 Cloud 部署请求
  const handleCloudDeploy = async () => {
    setIsGenerating(true);
    setShowModal(true);

    try {
      const response = await fetch("https://axovcyuykttb.sealoshzh.site/api/v1/website/functions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: functionName,
          language: "go", // 可以根据需要修改
          output_schema: outputSchema,
          background: background,
          examples: examples
        }),
      });

      const data = await response.json();
      setGeneratedCode(data);
    } catch (error) {
      console.error("Deployment failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Helper function to copy code to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // 修改复制函数
  const handleCopySymbolicCode = async () => {
    try {
      await navigator.clipboard.writeText(symbolCode);
      setToastMessage('Symbolic code copied!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      setToastMessage('Failed to copy code');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const handleCopyPathlessCode = async () => {
    try {
      await navigator.clipboard.writeText(pathlessCode);
      setToastMessage('Pathless code copied!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      setToastMessage('Failed to copy code');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-transparent blur-[80px]"></div>
      </div>

      <section className="pt-32 lg:pt-40 pb-20 lg:pb-24"> {/* 增加顶部间距 */}
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="min-h-[calc(100vh-8rem)] grid lg:grid-cols-2 gap-12 lg:gap-24 items-center"> {/* 调整最小高度和垂直居中 */}
              <div className="lg:sticky lg:top-32"> {/* 增加顶部间距 */}
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8">
                  <span className="block text-white">
                    Create an API
                  </span>
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    in Seconds
                  </span>
                </h1>
                
                <p className="text-lg text-white/60 font-light mb-12 max-w-xl">
                  Pathless Lambda is a non-symbolic function implementation cloud service
                </p>
                
                <div className="flex flex-wrap gap-4 mb-12">
                  {[
                    { text: 'Any Language', icon: '🌐' },
                    { text: 'Any Scenario', icon: '🎯' },
                    { text: 'Any Complexity', icon: '🔄' }
                  ].map((tag, index) => (
                    <div key={index} className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 to-purple-500/30 
                        rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300">
                      </div>
                      <div className="relative px-5 py-2.5 rounded-full bg-black/30 backdrop-blur-sm 
                        border border-white/[0.08] hover:border-white/20 transition-colors">
                        <span className="flex items-center gap-2.5 text-white/90 text-sm font-medium">
                          <span className="text-base">{tag.icon}</span>
                          <span>{tag.text}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <Button 
                    className="w-full sm:w-auto px-8 py-6 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 
                      text-white text-lg font-medium
                      hover:from-blue-600 hover:to-purple-600
                      transition-all duration-300 hover:scale-[1.02]
                      shadow-lg shadow-blue-500/20"
                  >
                    Join Waiting List
                  </Button>
                  <p className="text-sm text-white/60 font-light">
                    Coming soon to GitHub and arXiv
                  </p>
                </div>
              </div>

              <div className="relative"> {/* 移除 lg:-mt-12 */}
                <div className="absolute -inset-4 bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent rounded-[32px] blur-2xl"></div>
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-[32px] blur-xl"></div>
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] via-transparent to-purple-500/[0.02] rounded-[32px]",
                  // 根据不同的 tab 调整投影高度
                  activeTab === 'sample' && "h-[400px]",  // Sample Cloud 内容较多
                  activeTab === 'cloud' && "h-[400px]",  // Cloud 内容最多
                  activeTab === 'api' && "h-[400px]",     // API 内容较少
                )}></div>
                
                <div className="relative bg-[#1A1A1A]/95 backdrop-blur-xl border border-white/10 rounded-[24px] overflow-hidden shadow-2xl">
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] via-transparent to-purple-500/[0.02]",
                    // 同样根据不同的 tab 调整内部投影高度
                    activeTab === 'sample' && "h-[400px]",
                    activeTab === 'cloud' && "h-[400px]",
                    activeTab === 'api' && "h-[400px]",
                  )}></div>
                  <div className="absolute -left-24 -top-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
                  <div className="absolute -right-24 -bottom-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>
                  
                  <div className="relative">
                    <Tabs defaultValue="sample" className="w-full" onValueChange={setActiveTab}>
                      <div className="border-b border-white/[0.08]">
                        <TabsList className="w-full flex bg-transparent">
                          {[
                            { value: 'sample', label: 'NL Services' },
                            { value: 'cloud', label: 'Services' },
                            { value: 'api', label: 'API' }
                          ].map((tab) => (
                            <TabsTrigger 
                              key={tab.value}
                              value={tab.value} 
                              className={cn(
                                "flex-1 py-3",
                                "text-sm",
                                "relative",
                                "bg-transparent",
                                "text-white/40",
                                "hover:text-white/60",
                                "data-[state=active]:text-white",
                                "data-[state=active]:bg-transparent",
                                "border-0 outline-none ring-0",
                                "focus:ring-0 focus:outline-none",
                                "transition-colors duration-200",
                                "after:absolute after:left-0 after:right-0 after:bottom-0",
                                "after:h-[2px]",
                                "after:bg-white/0",
                                "after:transition-all after:duration-200",
                                "hover:after:bg-white/10",
                                "data-[state=active]:after:bg-white/40"
                              )}
                            >
                              {tab.label}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </div>

                      <TabsContent 
                        value="sample" 
                        className="p-6 space-y-6"
                      >
                        <div className="bg-gradient-to-br from-[#111111] to-[#0D0D0D] rounded-xl p-6 shadow-lg relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] via-transparent to-purple-500/[0.02]"></div>
                          <div className="relative">
                            <div className="text-white/90 text-base font-medium mb-4">
                              Input Requirements
                            </div>
                            <Textarea 
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              placeholder="Enter your API requirements..."
                              className="min-h-[160px] bg-[#0A0A0A] border border-white/10 rounded-lg resize-none 
                                text-white/90 placeholder:text-white/30
                                focus:ring-1 focus:ring-white/20 focus:border-white/20
                                hover:border-white/20 transition-colors"
                            />
                            <div className="mt-4 flex items-center justify-between text-sm">
                              <button className="relative px-4 py-1.5 bg-[#0A0A0A] text-white/70 rounded-md border border-white/10 
                                hover:bg-[#141414] hover:text-white/90 transition-colors group overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <span className="relative">Choose Template</span>
                              </button>
                              <span className="text-white/40 text-xs">
                                Note: Only one requirement can be processed at a time
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="relative">
                            <div className="text-white/90 text-sm font-medium mb-2">Select Language</div>
                            <div className="flex gap-4">
                              <Select
                                value={language}
                                onValueChange={setLanguage}
                              >
                                <SelectTrigger className="w-full h-11 bg-[#0A0A0A] border border-white/10 text-white/90">
                                  <SelectValue placeholder="Choose language" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="go">Go</SelectItem>
                                  <SelectItem value="rust">Rust</SelectItem>
                                  <SelectItem value="python">Python</SelectItem>
                                </SelectContent>
                              </Select>
                              <input
                                type="text"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                placeholder="Or type language here"
                                className="flex-1 h-11 px-4 bg-[#0A0A0A] border border-white/10 rounded-lg
                                  text-white/90 placeholder:text-white/30
                                  focus:ring-1 focus:ring-white/20 focus:border-white/20
                                  hover:border-white/20 transition-colors"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Button 
                            onClick={handleGenerate}
                            className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-500 
                              hover:from-blue-600 hover:to-purple-600 text-white"
                          >
                            Get excited code & Create API ✨
                          </Button>
                          <div className="text-center text-white/40 text-xs">
                            Get your API in seconds
                          </div>
                        </div>

                        <div className="text-center space-y-1">
                          <div className="text-white/40 text-xs">Found a bug that needs fixing? Report it here:</div>
                          <a href="mailto:info@topos.ai" className="text-blue-400 hover:text-blue-300 text-xs">
                            info@topos.ai
                          </a>
                        </div>
                      </TabsContent>

                      <TabsContent 
                        value="cloud" 
                        className="p-6 space-y-6"
                      >
                        <div className="space-y-6">
                          <h3 className="text-xl font-light text-white">Cloud Deployment</h3>
                          <div className="grid gap-4">
                            <div className="p-4 bg-[#111111] rounded-lg border border-white/10">
                              <h4 className="text-white/90 text-sm font-medium mb-2">Function Name</h4>
                              <input
                                type="text"
                                value={functionName}
                                onChange={(e) => setFunctionName(e.target.value)}
                                className="w-full h-11 px-4 bg-[#0A0A0A] border border-white/10 rounded-lg
                                  text-white/90 placeholder:text-white/30
                                  focus:ring-1 focus:ring-white/20 focus:border-white/20
                                  hover:border-white/20 transition-colors"
                              />
                            </div>

                            <div className="p-4 bg-[#111111] rounded-lg border border-white/10">
                              <h4 className="text-white/90 text-sm font-medium mb-2">Output Schema</h4>
                              <input
                                type="text"
                                value={outputSchema}
                                onChange={(e) => setOutputSchema(e.target.value)}
                                className="w-full h-11 px-4 bg-[#0A0A0A] border border-white/10 rounded-lg
                                  text-white/90 placeholder:text-white/30
                                  focus:ring-1 focus:ring-white/20 focus:border-white/20
                                  hover:border-white/20 transition-colors"
                              />
                            </div>

                            <div className="p-4 bg-[#111111] rounded-lg border border-white/10">
                              <h4 className="text-white/90 text-sm font-medium mb-2">Background</h4>
                              <Textarea
                                value={background}
                                onChange={(e) => setBackground(e.target.value)}
                                className="min-h-[100px] bg-[#0A0A0A] border border-white/10 rounded-lg
                                  text-white/90 placeholder:text-white/30
                                  focus:ring-1 focus:ring-white/20 focus:border-white/20
                                  hover:border-white/20 transition-colors"
                              />
                            </div>

                            <div className="p-4 bg-[#111111] rounded-lg border border-white/10">
                              <h4 className="text-white/90 text-sm font-medium mb-2">Example</h4>
                              <Textarea
                                value={JSON.stringify(examples[0], null, 2)}
                                onChange={(e) => {
                                  try {
                                    setExamples([JSON.parse(e.target.value)]);
                                  } catch (error) {
                                    // 处理 JSON 解析错误
                                  }
                                }}
                                className="min-h-[200px] bg-[#0A0A0A] border border-white/10 rounded-lg
                                  text-white/90 placeholder:text-white/30 font-mono
                                  focus:ring-1 focus:ring-white/20 focus:border-white/20
                                  hover:border-white/20 transition-colors"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Button 
                              onClick={handleCloudDeploy}
                              className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-500 
                                hover:from-blue-600 hover:to-purple-600 text-white"
                            >
                              Get excited code & Create API ✨
                            </Button>
                            <div className="text-center text-white/40 text-xs">
                              Get your API in seconds
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent 
                        value="api" 
                        className="p-6 space-y-8"
                      >
                        <div className="space-y-8">
                          <div className="flex items-center gap-4">
                            <Select>
                              <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white/80">
                                <SelectValue placeholder="Open in IDE" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="vscode">
                                  <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                    VSCode
                                  </div>
                                </SelectItem>
                                <SelectItem value="vscode-insiders">
                                  <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                    VSCode Insiders
                                  </div>
                                </SelectItem>
                                <SelectItem value="cursor">
                                  <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Cursor
                                  </div>
                                </SelectItem>
                                <SelectItem value="windsurf">
                                  <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                                    </svg>
                                    Windsurf
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>

                            <Button 
                              variant="outline"
                              className="bg-white/5 border-white/10 hover:bg-white/10 text-white/80"
                              onClick={() => copyToClipboard(createFunctionRules)}
                            >
                              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              Copy Rules
                            </Button>
                          </div>

                          <div className="space-y-6">
                            <div>
                              <h3 className="text-lg font-medium text-white/90 mb-4">Create function with</h3>
                              <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                                <div className="relative bg-[#0A0A0A] rounded-xl overflow-hidden border border-white/10">
                                  <SyntaxHighlighter
                                    language="bash"
                                    style={atomDark}
                                    customStyle={{
                                      background: 'transparent',
                                      padding: '1.5rem',
                                      margin: 0,
                                      fontSize: '0.875rem',
                                      lineHeight: '1.7',
                                    }}
                                  >
                                    {`curl -X POST https://axovcyuykttb.sealoshzh.site/api/v1/functions \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Function Name",
    "schema": "Output Data Class JSON Schema",
    "background": "Business Rules and Other Constraints",
    "examples": [{
      "input": "Input Example",
      "output": "Expected Output"
    }]
  }'`}
                                  </SyntaxHighlighter>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h3 className="text-lg font-medium text-white/90 mb-4">Use with</h3>
                              <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                                <div className="relative bg-[#0A0A0A] rounded-xl overflow-hidden border border-white/10">
                                  <SyntaxHighlighter
                                    language="bash"
                                    style={atomDark}
                                    customStyle={{
                                      background: 'transparent',
                                      padding: '1.5rem',
                                      margin: 0,
                                      fontSize: '0.875rem',
                                      lineHeight: '1.7',
                                    }}
                                  >
                                    {`curl -X POST https://axovcyuykttb.sealoshzh.site/api/v1/functions/{function_id}/execute \\
  -H "Content-Type: application/json" \\
  -d 'Input'`}
                                  </SyntaxHighlighter>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 lg:mt-32 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl blur-2xl"></div>
              
              <div className="relative mb-12">
                <div className="flex items-center gap-4 mb-4">
                  <span className="h-px w-12 bg-gradient-to-r from-blue-500 to-purple-500"></span>
                  <h2 className="text-3xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 tracking-tight">
                    Implementation Comparison
                  </h2>
                </div>
                <p className="text-white/40 text-lg ml-16">
                  Symbolic vs Pathless Lambda Implementation
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 relative">
                {/* Symbolic Implementation */}
                <div className="relative group h-[700px]"> {/* 固定高度 */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative bg-[#1a1a1a] rounded-xl overflow-hidden border border-white/10 h-full flex flex-col">
                    <div className="flex flex-col flex-shrink-0"> {/* 添加 flex-shrink-0 防止头部被压缩 */}
                      {/* 代码行数提示 */}
                      <div className="px-4 py-2 bg-blue-500/10 border-b border-white/10">
                        <span className="text-sm font-medium text-blue-400">103 lines of code</span>
                      </div>
                      
                      {/* 标题栏 */}
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#1a1a1a] to-[#1a1a1a]/80 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                          </div>
                          <span className="text-white/60 font-medium">Symbolic Implementation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white/40">Go</span>
                          <button 
                            onClick={handleCopySymbolicCode}
                            className="p-1.5 hover:bg-white/5 rounded-md transition-colors"
                          >
                            <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 代码区域 - 使用 flex-1 和 overflow-auto */}
                    <div className="flex-1 overflow-auto">
                    <SyntaxHighlighter
                      language="go"
                      style={atomDark}
                      customStyle={{
                        background: 'transparent',
                        padding: '1.5rem',
                        margin: 0,
                        fontSize: '0.875rem',
                        lineHeight: '1.7',
                        height: 'calc(100% )',
                        overflow: 'auto',
                          ...darkScrollbarStyle,  // 使用暗色滚动条样式
                      }}
                      showLineNumbers
                      wrapLongLines
                    >
                        {symbolCode}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </div>

                {/* Pathless Implementation - 使用相同的结构 */}
                <div className="relative group h-[700px]">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative bg-[#1a1a1a] rounded-xl overflow-hidden border border-white/10 h-full flex flex-col">
                    <div className="flex flex-col flex-shrink-0"> {/* 添加 flex-shrink-0 防止头部被压缩 */}
                      {/* 代码行数提示 */}
                      <div className="px-4 py-2 bg-green-500/10 border-b border-white/10 flex items-center justify-between">
                        <span className="text-sm font-medium text-green-400">34 lines of code</span>
                        <span className="text-xs text-green-400/80">3x less code</span>
                      </div>
                      
                      {/* 原有的标题栏 */}
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#1a1a1a] to-[#1a1a1a]/80 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                          </div>
                          <span className="text-white/60 font-medium">Pathless Lambda Implementation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white/40">Go</span>
                          <button 
                            onClick={handleCopyPathlessCode}
                            className="p-1.5 hover:bg-white/5 rounded-md transition-colors"
                          >
                            <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <SyntaxHighlighter
                      language="go"
                      style={atomDark}
                      customStyle={{
                        background: 'transparent',
                        padding: '1.5rem',
                        margin: 0,
                        fontSize: '0.875rem',
                        lineHeight: '1.7',
                        height: 'calc(100% - 4rem)',
                        overflow: 'auto',
                          ...darkScrollbarStyle,  // 使用暗色滚动条样式
                      }}
                      showLineNumbers
                      wrapLongLines
                    >
                      {pathlessCode}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center px-4 py-2 bg-[#0A0A0A] border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <span className="text-sm text-white/60 font-medium ml-2">
                  {language.charAt(0).toUpperCase() + language.slice(1)} Implementation
                </span>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-xs text-white/40">{language}</span>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1.5 hover:bg-white/5 rounded-md transition-colors"
                >
                  <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-auto max-h-[calc(90vh-48px)]">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-12 h-12 border-2 border-white/10 border-t-white/40 rounded-full animate-spin"></div>
                  <p className="mt-4 text-white/60">Generating your code...</p>
                </div>
              ) : generatedCode ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-white/60 text-sm">Function ID: {generatedCode.function_id}</div>
                    <button
                      onClick={() => copyToClipboard(generatedCode.code)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-md 
                        text-white/60 text-sm hover:bg-white/10 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" 
                        />
                      </svg>
                      Copy code
                    </button>
                  </div>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                      rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300">
                    </div>
                    <div className="relative bg-[#0A0A0A] rounded-xl overflow-hidden border border-white/10">
                      <SyntaxHighlighter
                        language={language.toLowerCase()}
                        style={atomDark}
                        customStyle={{
                          background: 'transparent',
                          padding: '1.5rem',
                          margin: 0,
                          fontSize: '0.875rem',
                          lineHeight: '1.7',
                          minHeight: '400px',
                          minWidth: '700px',
                        }}
                        showLineNumbers
                        wrapLines
                        lineProps={lineNumber => ({
                          style: {
                            display: 'block',
                            backgroundColor: lineNumber % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                          },
                        })}
                      >
                        {generatedCode.code}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed bottom-4 right-4 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-md shadow-lg">
          {toastMessage}
        </div>
      )}

      <div className="py-32 relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 rounded-3xl blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent"></div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="relative space-y-16">
              <div className="flex flex-col items-start gap-6 mb-16">
                <div className="flex items-center gap-4">
                  <span className="h-px w-16 bg-gradient-to-r from-blue-500 to-purple-500"></span>
                  <span className="text-sm font-semibold text-blue-400">Why Choose Pathless Lambda</span>
                </div>
                <h2 className="text-5xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 tracking-tight">
                  Advantages of Non-Symbolic Implementation
                </h2>
                <p className="text-xl text-white/70 max-w-2xl leading-relaxed">
                  Experience the benefits of our innovative approach to API implementation, combining flexibility with reliability.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-blue-500/15 blur-3xl -z-10"></div>
                {[
                  {
                    title: 'Rapid Prototype\nValidation', // 使用换行让标题两行显示
                    icon: '🚀',
                    description: 'Validate your ideas quickly without getting caught up in interface definitions.',
                    items: [
                      'No upfront interface design needed',
                      'Natural language business logic',
                      'Quick idea validation'
                    ]
                  },
                  {
                    title: 'Smooth Transition to\nSymbolic', // 使用换行让标题两行显示
                    icon: '🔄',
                    description: 'Non-symbolic interfaces can be rewritten into traditional symbolic implementations at any time.',
                    items: [
                      'Use non-symbolic during validation phase, transition to symbolic when stable',
                      'No technical debt, low transition cost'
                    ]
                  },
                  {
                    title: 'Interface Contract\nEvolution', // 使用换行让标题两行显示
                    icon: '📈',
                    description: 'Accumulate interface definitions through actual call data, gradually refine interface specifications during use, and build best practices based on examples.',
                    items: [
                      'Accumulate interface definitions through actual call data',
                      'Gradually refine interface specifications during use',
                      'Build best practices based on examples'
                    ]
                  }
                ].map((advantage, index) => (
                  <div key={index} className="relative group transition-all duration-500 hover:-translate-y-2">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative p-8 bg-gradient-to-b from-[#1a1a1a]/90 to-[#1a1a1a]/70 backdrop-blur-xl rounded-xl border border-white/10 h-full flex flex-col">
                      {/* 标题部分 - 固定高度 */}
                      <div className="h-20 flex items-start gap-4">
                        <span className="text-4xl mt-1">{advantage.icon}</span>
                        <h3 className="text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-br from-white to-white/90 whitespace-pre-line">
                          {advantage.title}
                        </h3>
                      </div>
                      
                      {/* 描述部分 - 固定高度 */}
                      <p className="h-20 text-white/70 text-base leading-relaxed mb-8"> {/* 增加底部间距 mb-6 -> mb-8 */}
                        {advantage.description}
                      </p>
                      
                      {/* 列表部分 - 设置固定起始位置 */}
                      <div className="flex-1 flex flex-col justify-start">
                        <ul className="space-y-6"> {/* 增加列表项间距 space-y-4 -> space-y-6 */}
                          {advantage.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300">
                              <span className="text-blue-400/80 mt-1.5 flex-shrink-0">
                                <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 8 8">
                                  <circle cx="4" cy="4" r="3"/>
                                </svg>
                              </span>
                              <span className="text-white/60 text-sm leading-relaxed font-light">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-32 relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 rounded-3xl blur-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent"></div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="relative space-y-16">
              <div className="flex flex-col items-start gap-6 mb-16">
                <div className="flex items-center gap-4">
                  <span className="h-px w-16 bg-gradient-to-r from-purple-500 to-blue-500"></span>
                  <span className="text-sm font-semibold text-purple-400">Perfect For Your Needs</span>
                </div>
                <h2 className="text-5xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 tracking-tight">
                  Use Cases
                </h2>
                <p className="text-xl text-white/70 max-w-2xl leading-relaxed">
                  Discover how Pathless Lambda can transform your development workflow in various scenarios.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-blue-500/15 blur-3xl -z-10"></div>
                {[
                  {
                    title: 'API\nPrototyping',  // 使用换行让标题两行显示
                    icon: '🔄',
                    description: 'Quickly validate API designs without getting caught up in interface definitions.',
                    items: [
                      'Rapid API prototyping and testing',
                      'Flexible interface evolution',
                      'Zero setup overhead'
                    ]
                  },
                  {
                    title: 'Business Logic\nValidation',  // 使用换行让标题两行显示
                    icon: '📋',
                    description: 'Focus on business rules validation without worrying about implementation details.',
                    items: [
                      'Natural language requirements',
                      'Quick business validation',
                      'Iterative refinement'
                    ]
                  },
                  {
                    title: 'Legacy System\nModernization',  // 使用换行让标题两行显示
                    icon: '🔄',
                    description: 'Gradually modernize legacy systems while maintaining business continuity.',
                    items: [
                      'Progressive migration',
                      'Risk-free transformation',
                      'Continuous operation'
                    ]
                  }
                ].map((useCase, index) => (
                  <div key={index} className="relative group transition-all duration-500 hover:-translate-y-2">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative p-8 bg-gradient-to-b from-[#1a1a1a]/90 to-[#1a1a1a]/70 backdrop-blur-xl rounded-xl border border-white/10 h-full flex flex-col">
                      {/* 标题部分 - 固定高度 */}
                      <div className="h-20 flex items-start gap-4">
                        <span className="text-4xl mt-1">{useCase.icon}</span>
                        <h3 className="text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-br from-white to-white/90 whitespace-pre-line">
                          {useCase.title}
                        </h3>
                      </div>
                      
                      {/* 描述部分 - 固定高度 */}
                      <p className="h-20 text-white/70 text-base leading-relaxed mb-8">
                        {useCase.description}
                      </p>
                      
                      {/* 列表部分 - 设置固定起始位置 */}
                      <div className="flex-1 flex flex-col justify-start">
                        <ul className="space-y-6">
                          {useCase.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300">
                              <span className="text-blue-400/80 mt-1.5 flex-shrink-0">
                                <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 8 8">
                                  <circle cx="4" cy="4" r="3"/>
                                </svg>
                              </span>
                              <span className="text-white/60 text-sm leading-relaxed font-light">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-32 relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl blur-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent"></div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="relative space-y-16">
              <div className="flex flex-col items-start gap-6 mb-16">
                <div className="flex items-center gap-4">
                  <span className="h-px w-16 bg-gradient-to-r from-blue-500 to-purple-500"></span>
                  <span className="text-sm font-semibold text-blue-400">Implementation Path</span>
                </div>
                <h2 className="text-5xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 tracking-tight">
                  From Prototype to Production
                </h2>
                <p className="text-xl text-white/70 max-w-2xl leading-relaxed">
                  Follow our recommended path to smoothly transition from rapid prototyping to production-ready implementation.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {[
                  {
                    title: "Non-Symbolic Phase",
                    description: "Quick implementation through Pathless Lambda",
                    icon: "🚀",
                    code: `// Quick implementation through Pathless
discount, err := CalculateDiscount(100, "VIP")`
                  },
                  {
                    title: "Symbolic Refactoring",
                    description: "When business is stable, easily refactor to traditional implementation",
                    icon: "⚙️",
                    code: `// Traditional implementation
type DiscountCalculator struct {
    rules map[string]float64
}

func (dc *DiscountCalculator) Calculate(
    price float64, 
    userType string,
) float64 {
    if discount, ok := dc.rules[userType]; ok {
        return price * discount
    }
    return price
}`
                  }
                ].map((phase, index) => (
                  <div key={index} className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative bg-[#1a1a1a]/90 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
                      <div className="flex items-center justify-between p-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{phase.icon}</span>
                          <h4 className="text-lg font-medium text-white/90">{phase.title}</h4>
                        </div>
                        <button
                          onClick={() => copyToClipboard(phase.code)}
                          className="p-1.5 hover:bg-white/5 rounded-md transition-colors group"
                          title="Copy code"
                        >
                          <svg className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                      <SyntaxHighlighter
                        language="go"
                        style={atomDark}
                        customStyle={{
                          background: 'transparent',
                          padding: '1.5rem',
                          margin: 0,
                          fontSize: '0.875rem',
                          lineHeight: '1.7',
                          height: '240px',
                          overflow: 'auto',
                          ...scrollbarStyle,  // 添加自定义滚动条样式
                        }}
                        showLineNumbers
                        wrapLongLines
                      >
                        {phase.code}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-24">
                <h3 className="text-3xl font-medium text-white/90 mb-12">Quick Start</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {[
                    {
                      title: "Create Pathless Function",
                      code: `curl -X POST hhttps://axovcyuykttb.sealoshzh.site/api/v1/functions \\
-H "Content-Type: application/json" \\
-d '{
  "name": "calculateDiscount",
  "schema": "{\"type\": \"object\", \"properties\": {\"discount\": {\"type\": \"number\"}}}",
  "background": "VIP users get 20% discount, regular users get 10% discount.",
  "examples": [{
    "input": {
      "originalPrice": 100,
      "userType": "VIP"
    },
    "output": {
      "discount": 80
    }
  }]
}'`
                    },
                    {
                      title: "Invoke Function Instance",
                      code: `curl -X POST https://axovcyuykttb.sealoshzh.site/api/v1/functions/{function_id}/execute \\
-H "Content-Type: application/json" \\
-d '{
  "userType": "VIP",
  "price": 100
}'`
                    }
                  ].map((example, index) => (
                    <div key={index} className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                      <div className="relative bg-[#1a1a1a]/90 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                          <h4 className="text-lg font-medium text-white/90">{example.title}</h4>
                          <button
                            onClick={() => copyToClipboard(example.code)}
                            className="p-1.5 hover:bg-white/5 rounded-md transition-colors group"
                            title="Copy code"
                          >
                            <svg className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                        <SyntaxHighlighter
                          language="bash"
                          style={atomDark}
                          customStyle={{
                            background: 'transparent',
                            padding: '1.5rem',
                            margin: 0,
                            fontSize: '0.875rem',
                            lineHeight: '1.7',
                            height: '240px',
                            overflow: 'auto',
                            ...scrollbarStyle,  // 添加自定义滚动条样式
                          }}
                          showLineNumbers
                          wrapLongLines
                        >
                          {example.code}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-32 relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl blur-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent"></div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="relative space-y-16">
              <div className="flex flex-col items-start gap-6 mb-16">
                <div className="flex items-center gap-4">
                  <span className="h-px w-16 bg-gradient-to-r from-blue-500 to-purple-500"></span>
                  <span className="text-sm font-semibold text-blue-400">Development Guide</span>
                </div>
                <h2 className="text-5xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 tracking-tight">
                  Use in Code
                </h2>
                <p className="text-xl text-white/70 max-w-2xl leading-relaxed">
                  Integrate Pathless Lambda into your applications with these code examples and best practices.
                </p>
              </div>

              <div className="space-y-24">
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">1</span>
                    <h3 className="text-2xl font-medium text-white/90">Function Configuration</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                      <div className="relative bg-[#1a1a1a]/90 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                          <h4 className="text-lg font-medium text-white/90">Configuration Schema</h4>
                          <button
                            onClick={() => copyToClipboard(configExample)}
                            className="p-1.5 hover:bg-white/5 rounded-md transition-colors group"
                            title="Copy code"
                          >
                            <svg className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                        <SyntaxHighlighter
                          language="json"
                          style={atomDark}
                          customStyle={{
                            background: 'transparent',
                            padding: '1.5rem',
                            margin: 0,
                            fontSize: '0.875rem',
                            lineHeight: '1.7',
                            height: '340px',
                            overflow: 'auto',
                            ...scrollbarStyle,  // 添加滚动条样式
                          }}
                          wrapLongLines
                          showLineNumbers
                        >
                          {configExample}
                        </SyntaxHighlighter>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="relative group h-full">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                        <div className="relative bg-[#1a1a1a]/90 backdrop-blur-xl rounded-xl border border-white/10 p-8">
                          <h4 className="text-lg font-medium text-white/90 mb-6">Key Components</h4>
                          <div className="space-y-6">
                            {[
                              {
                                title: "Function Definition",
                                description: "Name and basic information about the function",
                                icon: "📝"
                              },
                              {
                                title: "Schema Definition",
                                description: "Input and output data structure specifications",
                                icon: "🔍"
                              },
                              {
                                title: "Business Rules",
                                description: "Clear description of business logic and constraints",
                                icon: "📋"
                              },
                              {
                                title: "Example Cases",
                                description: "Sample input/output pairs for validation",
                                icon: "✨"
                              }
                            ].map((item, index) => (
                              <div key={index} className="flex items-start gap-4 group/item">
                                <span className="text-2xl group-hover/item:scale-110 transition-transform">
                                  {item.icon}
                                </span>
                                <div className="space-y-1">
                                  <h5 className="text-white/90 font-medium">{item.title}</h5>
                                  <p className="text-white/60 text-sm">{item.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">2</span>
                    <h3 className="text-2xl font-medium text-white/90">Implementation Examples</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {[
                      {
                        language: "Go",
                        code: goExample,
                        icon: "🔷"
                      },
                      {
                        language: "Python",
                        code: pythonExample,
                        icon: "🔶"
                      }
                    ].map((example, index) => (
                      <div key={index} className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                        <div className="relative bg-[#1a1a1a]/90 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
                          <div className="flex items-center justify-between p-4 border-b border-white/10">
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{example.icon}</span>
                              <h4 className="text-lg font-medium text-white/90">{example.language} Implementation</h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleViewFullCode(example.code, example.language.toLowerCase(), `${example.language} Implementation`)}
                                className="px-3 py-1.5 text-sm text-white/60 hover:text-white/90 hover:bg-white/5 rounded-md transition-colors"
                              >
                                View Full Code
                              </button>
                              <button
                                onClick={() => copyToClipboard(example.code)}
                                className="p-1.5 hover:bg-white/5 rounded-md transition-colors group"
                                title="Copy code"
                              >
                                <svg className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              </button>
                              </div>
                          </div>
                          <SyntaxHighlighter
                            language={example.language.toLowerCase()}
                            style={atomDark}
                            customStyle={{
                              background: 'transparent',
                              padding: '1.5rem',
                              margin: 0,
                              fontSize: '0.875rem',
                              lineHeight: '1.7',
                              height: '340px',
                              overflow: 'auto',
                              ...scrollbarStyle,  // 应用自定义滚动条样式
                            }}
                            showLineNumbers
                            wrapLongLines
                          >
                            {example.code}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">3</span>
                    <h3 className="text-2xl font-medium text-white/90">Best Practices</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {[
                      {
                        title: "Error Handling",
                        code: errorHandlingExample,
                        icon: "🛡️"
                      },
                      {
                        title: "Performance",
                        code: performanceExample,
                        icon: "⚡"
                      },
                      {
                        title: "Testing",
                        items: [
                          "Use example cases for unit tests",
                          "Mock API responses in tests",
                          "Test error scenarios",
                          "Validate response formats"
                        ],
                        icon: "🎯"
                      }
                    ].map((practice, index) => (
                      <div key={index} className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                        <div className="relative bg-[#1a1a1a]/90 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
                          <div className="flex items-center gap-3 p-4 border-b border-white/10">
                            <span className="text-xl">{practice.icon}</span>
                            <h4 className="text-lg font-medium text-white/90">{practice.title}</h4>
                          </div>
                          <div className="p-6">
                            {practice.code ? (
                              <SyntaxHighlighter
                                language="go"
                                style={atomDark}
                                customStyle={{
                                  background: 'transparent',
                                  padding: '1rem',
                                  margin: 0,
                                  fontSize: '0.875rem',
                                  lineHeight: '1.7',
                                  height: '240px',
                                  overflow: 'auto',
                                  ...scrollbarStyle,  // 添加滚动条样式
                                }}
                                wrapLongLines
                              >
                                {practice.code}
                              </SyntaxHighlighter>
                            ) : (
                              <ul className="space-y-4 text-white/60">
                                {practice.items?.map((item, itemIndex) => (
                                  <li key={itemIndex} className="flex items-start gap-2">
                                    <span className="text-blue-400 mt-1">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {codeModal.show && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-medium text-white/90">{codeModal.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(codeModal.code)}
                  className="p-1.5 hover:bg-white/5 rounded-md transition-colors group"
                  title="Copy code"
                >
                  <svg className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
                </button>
                <button
                  onClick={() => setCodeModal(prev => ({ ...prev, show: false }))}
                  className="p-1.5 hover:bg-white/5 rounded-md transition-colors"
                >
                  <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
                </button>
              </div>
            </div>
            <div className="p-4 overflow-auto max-h-[calc(90vh-5rem)]">
              <SyntaxHighlighter
                language={codeModal.language}
                style={atomDark}
                customStyle={{
                  background: 'transparent',
                  padding: '1.5rem',
                  margin: 0,
                  fontSize: '0.875rem',
                  lineHeight: '1.7',
                  ...scrollbarStyle,  // 添加滚动条样式
                }}
                showLineNumbers
                wrapLongLines
              >
                {codeModal.code}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 