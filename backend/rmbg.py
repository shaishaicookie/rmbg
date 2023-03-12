import huggingface_hub
import matplotlib.pyplot as plt
import onnxruntime as rt
import numpy as np
import cv2
from PIL import Image
import io
import base64

providers = ['CPUExecutionProvider']
model_path = huggingface_hub.hf_hub_download("skytnt/anime-seg", "isnetis.onnx")
rmbg_model = rt.InferenceSession(model_path, providers=providers)



def get_mask(img, s=1024):
    img = (img / 255).astype(np.float32)
    h, w = h0, w0 = img.shape[:-1]
    h, w = (s, int(s * w / h)) if h > w else (int(s * h / w), s)
    ph, pw = s - h, s - w
    img_input = np.zeros([s, s, 3], dtype=np.float32)
    img_input[ph // 2:ph // 2 + h, pw // 2:pw // 2 + w] = cv2.resize(img, (w, h))
    img_input = np.transpose(img_input, (2, 0, 1))
    img_input = img_input[np.newaxis, :]
    mask = rmbg_model.run(None, {'img': img_input})[0][0]
    mask = np.transpose(mask, (1, 2, 0))
    mask = mask[ph // 2:ph // 2 + h, pw // 2:pw // 2 + w]
    mask = cv2.resize(mask, (w0, h0))[:, :, np.newaxis]
    return mask


def rmbg_fn(img):
    orginal = Image.fromarray(img)
    orginal_buffer = io.BytesIO()
    orginal.save(orginal_buffer, format='PNG')
    orginal = orginal_buffer.getvalue()

    mask = get_mask(img)
    img = (mask * img + 255 * (1 - mask)).astype(np.uint8)
    mask = (mask * 255).astype(np.uint8)
    img = np.concatenate([img, mask], axis=2, dtype=np.uint8)
    mask = mask.repeat(3, axis=2)

    img = Image.fromarray(img)
    mask = Image.fromarray(mask)
    img_buffer = io.BytesIO()
    mask_buffer = io.BytesIO()
    img.save(img_buffer, format='PNG')
    mask.save(mask_buffer, format='PNG')
    img = img_buffer.getvalue()
    mask = mask_buffer.getvalue()
    orginal_str = base64.b64encode(orginal).decode('utf-8')
    rmbg_str = base64.b64encode(img).decode('utf-8')
    mask_str = base64.b64encode(mask).decode('utf-8')
    return orginal_str, rmbg_str, mask_str


