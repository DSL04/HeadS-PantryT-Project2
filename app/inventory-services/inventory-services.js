import { firestore } from '@/firebase';
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, increment } from 'firebase/firestore';

// Fetch inventory items
export const fetchInventory = async () => {
  const q = query(collection(firestore, 'inventory'));
  const querySnapshot = await getDocs(q);
  const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return items;
};

// Add or update inventory item
export const addOrUpdateItem = async (itemName, quantity) => {
  const itemRef = doc(firestore, 'inventory', itemName);
  const itemSnap = await getDoc(itemRef);
  if (itemSnap.exists()) {
    await updateDoc(itemRef, {
      quantity: increment(quantity)
    });
  } else {
    await setDoc(itemRef, {
      quantity: quantity
    });
  }
};

// Delete or decrement inventory item quantity
export const deleteItem = async (itemName) => {
  const itemRef = doc(firestore, 'inventory', itemName);
  const itemSnap = await getDoc(itemRef);
  if (itemSnap.exists()) {
    const currentQuantity = itemSnap.data().quantity;
    if (currentQuantity > 1) {
      await updateDoc(itemRef, {
        quantity: increment(-1)
      });
    } else {
      await deleteDoc(itemRef);
    }
  }
};