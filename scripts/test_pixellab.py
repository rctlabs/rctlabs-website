import os
import requests
import json
import time

def test_pixellab_generation(prompt, api_key):
    """
    ฟังก์ชันทดสอบการเรียกใช้งาน Pixellab.ai API เพื่อสร้าง Pixel Art
    หมายเหตุ: ตัว endpoint และ payload อาจต้องปรับอ้างอิงตาม API Docs ล่าสุดของ Pixellab
    """
    print(f"🚀 เริ่มต้นทดสอบสร้าง Pixel Art ด้วยคำสั่ง: '{prompt}'")
    
    # URL สำหรับ API (ตัวอย่าง endpoint อิงตามโครงสร้าง REST API ทั่วไป)
    # กรุณาครอสเช็กกับ Document ของ Pixellab.ai อีกครั้งตอนใช้งานจริง
    url = "https://api.pixellab.ai/v1/generate"
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    # Payload สำหรับ Generate Image Pixflux
    data = {
        "prompt": prompt,
        "width": 128,          # ขนาดที่ระบบแนะนำสำหรับไอคอน
        "height": 128,
        "transparent": True,   # ให้พื้นหลังใส เหมาะกับการนำไปใช้ในเว็บ
        "style": "pixel_art",
        # "palette": [...],    # สามารถบังคับโทนสี (Color Palette) ให้ตรงกับของ rctlabs-v0 ได้
    }
    
    print("⏳ กำลังส่งคำขอไปยัง Pixellab.ai...")
    
    try:
        response = requests.post(url, headers=headers, json=data)
        
        if response.status_code == 200:
            result = response.json()
            # สมมติว่าคืนค่าเป็น URL ของรูปภาพ
            image_url = result.get("image_url")
            print(f"✅ สร้างสำเร็จ! สามารถดูรูปได้ที่: {image_url}")
            
            # โค้ดสำหรับดาวน์โหลดรูปภาพมาเก็บไว้
            if image_url:
                img_data = requests.get(image_url).content
                with open("test_pixel_art.png", "wb") as handler:
                    handler.write(img_data)
                print("💾 บันทึกรูปภาพลงเครื่องในชื่อ 'test_pixel_art.png' เรียบร้อย")
        else:
            print(f"❌ เกิดข้อผิดพลาด: {response.status_code}")
            print(response.text)
            
    except Exception as e:
        print(f"⚠️ มีข้อผิดพลาดในการเชื่อมต่อ: {e}")

if __name__ == "__main__":
    # TODO: ใส่ API Key ของคุณที่นี่ หรือตั้งเป็น Environment Variable
    API_KEY = os.environ.get("PIXELLAB_API_KEY", "ใส่_API_KEY_ของคุณที่นี่")
    
    if API_KEY == "ใส่_API_KEY_ของคุณที่นี่":
        print("💡 อย่าลืมใส่ API Key ของ Pixellab.ai ก่อนรันสคริปต์นะครับ!")
    
    # ทดลองสร้างรูป Mascot สำหรับ RCT Labs
    test_prompt = "A futuristic mascot robot in pixel art style, high quality, dark tech theme with amber accents, standalone, clean design"
    
    test_pixellab_generation(test_prompt, API_KEY)
