import os
import requests
import base64
import time

API_KEY = "fe7d9902-8cc4-4e88-b047-0247b7c46ecc"
HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

def check_balance():
    print("🔍 กำลังตรวจสอบสถานะ API Key (Balance)...")
    url = "https://api.pixellab.ai/v1/balance"
    try:
        res = requests.get(url, headers=HEADERS, timeout=10)
        print(f"Status Code: {res.status_code}")
        if res.status_code == 200:
            data = res.json()
            print(f"✅ ยอดเครดิตคงเหลือ: {data.get('usd', 'Unknown')} USD")
            return True
        else:
            print(f"❌ เช็คยอดล้มเหลว: {res.text}")
            return False
    except Exception as e:
        print(f"⚠️ ข้อผิดพลาดในการเชื่อมต่อ (Balance): {e}")
        return False

def test_generation():
    print("\n🚀 กำลังทดลองสร้างรูปภาพอีกครั้ง...")
    url = "https://api.pixellab.ai/v1/generate-image-pixflux"
    data = {
        "description": "A glowing warm amber microchip, 8-bit pixel art, transparent background",
        "image_size": {"width": 128, "height": 128},
        "no_background": True,
        "text_guidance_scale": 8.0
    }
    
    start_time = time.time()
    try:
        # Set a 60 second timeout for the generation request
        response = requests.post(url, headers=HEADERS, json=data, timeout=60)
        elapsed = time.time() - start_time
        print(f"⏱️ ใช้เวลาไป: {elapsed:.2f} วินาที")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            base64_img = result.get("image", {}).get("base64", "")
            
            if "," in base64_img:
                base64_img = base64_img.split(",")[1]
                
            img_data = base64.b64decode(base64_img)
            filepath = "/home/ittirit720/work/rctlabs-v0/test_pixellab/retry_test.png"
            with open(filepath, "wb") as f:
                f.write(img_data)
            print(f"✅ บันทึกรูปภาพสำเร็จที่: {filepath}")
        else:
            print(f"❌ เกิดข้อผิดพลาด API: {response.text}")
    except requests.exceptions.Timeout:
        elapsed = time.time() - start_time
        print(f"⏳ Timeout Error: เซิร์ฟเวอร์ไม่ตอบสนองหลังจากผ่านไป {elapsed:.2f} วินาที")
    except Exception as e:
        print(f"⚠️ ข้อผิดพลาดในการเชื่อมต่อ: {e}")

if __name__ == "__main__":
    if check_balance():
        test_generation()
